// src/scripts/notionToChangelog.js
const { Client } = require('@notionhq/client');
const fs = require('fs-extra');
const path = require('path');
const dotenv = require('dotenv');

// 載入.env檔案中的環境變數
dotenv.config();

// 定義分類對應的表情符號
const categoryEmojis = {
  '功能新增': ':rocket:',
  '功能改進': ':sparkles:',
  '問題修復': ':bug:',
  '文件更新': ':memo:',
  '依賴項更新': ':robot:',
  '維護': ':wrench:',
  // 可以根據需要添加更多分類
  '其他': ':gear:'
};

// 定義已知的貢獻者GitHub連結
const knownContributors = {
  'Tommy Chang': 'AidChen0509',
  'Peter Chen': '94Peter',
  // 可以根據需要添加更多貢獻者
};

// 初始化Notion客戶端
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// 獲取資料庫ID
const databaseId = process.env.NOTION_DATABASE_ID || '1b23114ed64380078306e9c3714d00c0';

/**
 * 從Notion資料庫獲取已完成測試的問題
 */
async function fetchIssuesFromNotion() {
  try {
    // 查詢狀態為"Dev 測試完成"的記錄
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        status: {
          equals: "Dev 測試完成",
        },
      },
      sorts: [
        {
          property: "版本號",
          direction: "descending",
        },
      ],
    });

    // 轉換Notion頁面到Issue物件
    const issues = [];

    for (const page of response.results) {
      const properties = page.properties;

      const issue = {
        bugNumber: properties['Bug Number']?.unique_id?.number?.toString() || '',
        title: properties['問題描述與詳細說明']?.title?.[0]?.plain_text || '',
        status: properties['Status']?.status?.name || '',
        ui: (properties['UI']?.multi_select || []).map(item => item.name),
        priority: (properties['修復優先級']?.multi_select || []).map(item => item.name),
        featureName: properties['功能名稱']?.select?.name || '',
        category: properties['問題分類']?.select?.name || '',
        assignee: properties['Assignee']?.people?.[0]?.name || '',
        version: properties['版本號']?.rich_text?.[0]?.plain_text || '',
        releaseStatus: properties['發佈狀態']?.select?.name || '',
        lastEditedTime: properties['Last edited time']?.last_edited_time || '',
        pageId: page.id, // 保存頁面ID，用於生成Notion URL
        url: `https://www.notion.so/${page.id.replace(/-/g, '')}`
      };

      issues.push(issue);
    }

    return issues;
  } catch (error) {
    console.error('從Notion獲取資料失敗:', error);
    throw error;
  }
}

/**
 * 按版本號分組問題
 */
function groupIssuesByVersion(issues) {
  const groupedIssues = {};

  issues.forEach(issue => {
    const version = issue.version || '未指定版本';
    if (!groupedIssues[version]) {
      groupedIssues[version] = [];
    }
    groupedIssues[version].push(issue);
  });

  return groupedIssues;
}

/**
 * 先按功能名稱分組，再按類別分組
 */
function groupIssuesByFeatureAndCategory(issues) {
  const groupedByFeature = {};

  // 先按功能名稱分組
  issues.forEach(issue => {
    const featureName = issue.featureName || '未分類功能';
    if (!groupedByFeature[featureName]) {
      groupedByFeature[featureName] = [];
    }
    groupedByFeature[featureName].push(issue);
  });

  // 再按問題類別進一步分組
  const groupedByFeatureAndCategory = {};

  Object.entries(groupedByFeature).forEach(([featureName, featureIssues]) => {
    groupedByFeatureAndCategory[featureName] = {};

    featureIssues.forEach(issue => {
      const category = issue.category || '其他';
      if (!groupedByFeatureAndCategory[featureName][category]) {
        groupedByFeatureAndCategory[featureName][category] = [];
      }
      groupedByFeatureAndCategory[featureName][category].push(issue);
    });
  });

  return groupedByFeatureAndCategory;
}

/**
 * 獲取貢獻者列表（對應Docusaurus的Committers格式）
 */
function getContributors(issues) {
  const contributorsMap = new Map();

  issues.forEach(issue => {
    if (issue.assignee) {
      // 如果在已知貢獻者中存在，使用已知的GitHub用戶名
      const github = knownContributors[issue.assignee] ||
        issue.assignee.toLowerCase().replace(/\s+/g, '');
      contributorsMap.set(issue.assignee, github);
    }
  });

  // 轉換為數組並按名稱排序
  return Array.from(contributorsMap.entries())
    .map(([name, github]) => ({ name, github }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * 將日期字串轉換為YYYY-MM-DD格式
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

/**
 * 生成版本的發布日期（使用最近修改的問題日期）
 */
function getVersionReleaseDate(issues) {
  // 找出最近的修改日期
  let latestDate = '';
  issues.forEach(issue => {
    if (!latestDate || issue.lastEditedTime > latestDate) {
      latestDate = issue.lastEditedTime;
    }
  });

  return formatDate(latestDate);
}

/**
 * 將問題分類轉換為Docusaurus官方風格的類別名稱
 */
function formatCategory(category) {
  const emoji = categoryEmojis[category] || ':gear:';
  return `${emoji} ${category}`;
}

/**
 * 將資料轉換為Docusaurus官方Changelog格式的Markdown
 */
function convertToChangelogMarkdown(groupedIssues) {
  let markdown = '# Docusaurus Changelog\n\n';

  // 按版本處理
  for (const [version, issues] of Object.entries(groupedIssues)) {
    const releaseDate = getVersionReleaseDate(issues);
    markdown += `## ${version} (${releaseDate})\n\n`;

    // 先按功能名稱分組，再按問題類別分組
    const issuesByFeatureAndCategory = groupIssuesByFeatureAndCategory(issues);

    // 按功能名稱遍歷
    for (const [featureName, categorizedIssues] of Object.entries(issuesByFeatureAndCategory)) {
      markdown += `#### ${featureName}\n\n`;

      // 按問題類別遍歷
      for (const [category, categoryIssues] of Object.entries(categorizedIssues)) {
        markdown += `### ${formatCategory(category)}\n\n`;

        // 收集所有影響到的UI
        const affectedUIs = new Set();
        categoryIssues.forEach(issue => {
          issue.ui.forEach(ui => {
            if (ui) {
              affectedUIs.add(ui);
            }
          });
        });

        // 如果有UI影響，添加影響的UI列表
        if (affectedUIs.size > 0) {
          markdown += `- \`${Array.from(affectedUIs).join('`, `')}\`\n`;
        }

        // 添加每個問題
        categoryIssues.forEach(issue => {
          // 構建類似Docusaurus的PR描述
          let description = issue.title;

          const prefix = category === '功能新增' ? 'feat' :
            category === '問題修復' ? 'fix' :
              category === '文件更新' ? 'docs' : 'chore';

          // 使用第一個UI作為scope，如果存在
          const scope = issue.ui.length > 0 ? issue.ui[0].toLowerCase() : '';
          const scopeText = scope ? `(${scope})` : '';

          // 生成GitHub風格的PR連結和描述
          markdown += `  - [#${issue.bugNumber}] ${prefix}${scopeText}: ${description} [🔗](${issue.url})`;

          // 添加作者
          if (issue.assignee) {
            const githubUsername = knownContributors[issue.assignee] ||
              issue.assignee.toLowerCase().replace(/\s+/g, '');
            markdown += ` ([@${githubUsername}](https://github.com/${githubUsername}))`;
          }

          // 添加所有UI標籤（如果有多個）
          if (issue.ui.length > 1) {
            markdown += ` [UI: ${issue.ui.join(', ')}]`;
          }

          // 添加所有優先級標籤
          if (issue.priority.length > 0) {
            markdown += ` [優先級: ${issue.priority.join(', ')}]`;
          }

          markdown += '\n';
        });

        markdown += '\n';
      }
    }

    // 添加貢獻者信息（與Docusaurus的parseAuthors兼容）
    const contributors = getContributors(issues);
    if (contributors.length > 0) {
      markdown += `#### Committers: ${contributors.length}\n\n`;
      contributors.forEach(({ name, github }) => {
        markdown += `- ${name} ([@${github}](https://github.com/${github}))\n`;
      });
      markdown += '\n';
    }
  }

  return markdown;
}

/**
 * 主函數：獲取Notion資料，轉換為Markdown，並保存檔案
 */
async function generateChangelog() {
  try {
    // 1. 獲取Notion資料
    console.log('從Notion獲取資料...');
    const issues = await fetchIssuesFromNotion();
    console.log(`成功獲取 ${issues.length} 條問題記錄`);

    // 2. 按版本分組
    const groupedIssues = groupIssuesByVersion(issues);

    // 3. 轉換為Markdown
    console.log('生成Changelog Markdown...');
    const markdown = convertToChangelogMarkdown(groupedIssues);

    // 4. 保存Markdown檔案
    const outputDir = path.resolve(process.cwd(), 'internal_changelog');
    // 確保目錄存在
    fs.ensureDirSync(outputDir);
    // 設置輸出路徑
    const outputPath = path.join(outputDir, 'CHANGELOG.md');
    await fs.writeFile(outputPath, markdown, 'utf8');

    console.log(`成功生成內部版本CHANGELOG.md檔案: ${outputPath}`);
  } catch (error) {
    console.error('生成Changelog失敗:', error);
    process.exit(1);
  }
}

// 執行主函數
generateChangelog();