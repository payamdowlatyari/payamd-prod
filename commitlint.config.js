/** @type {import('@commitlint/types').UserConfig} */
const CommitLintConfiguration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      ["components", "layout", "pages", "styles", "utils", "types"],
    ],
    "scope-case": [2, "always", "kebab-case"],
  },
  prompt: {
    messages: {
      type: "Select the type of change that you're committing:",
      scope: "\nDenote the SCOPE of this change (optional):",
      customScope: "Denote the SCOPE of this change:",
      subject: "Write a SHORT, IMPERATIVE tense description of the change:",
      body: 'Provide a LONGER description (optional). Use "|" to break new line:',
      breaking: 'List any BREAKING CHANGES (optional):',
      footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:',
      confirmCommit: 'Are you sure you want to proceed with the above change?',
    },
    types: [
      { value: "feat", name: "✨ feat:     A new feature" },
      { value: "fix", name: "🐛 fix:      A bug fix" },
      { value: "docs", name: "📝 docs:     Documentation only changes" },
      { value: "style", name: "💎 style:    Changes that do not affect the meaning of the code" },
      { value: "refactor", name: "♻️ refactor: A code change that neither fixes a bug nor adds a feature" },
      { value: "perf", name: "⚡ perf:     A code change that improves performance" },
      { value: "test", name: "✅ test:     Adding missing tests or correcting existing tests" },
      { value: "chore", name: "🧹 chore:    Changes to the build process or auxiliary tools and libraries such as documentation generation" },
      { value: "revert", name: "⏪️ revert:   Revert to a commit" },
    ],
    useEmoji: true,
    emojiAlign: "center",
    themeColorCode: "yellow",
    questions: {
      type: {
        description: "Please select the type of change that you're committing:",
        enum: {
          feat: {
            description: "A new feature",
            title: "Features",
          },
          fix: {
            description: "A bug fix",
            title: "Bug Fixes",
          },
          docs: {
            description: "Documentation only changes",
            title: "Documentation",
          },
          style: {
            description: "Changes that do not affect the meaning of the code",
            title: "Styles",  
          },
          refactor: {
            description: "A code change that neither fixes a bug nor adds a feature",
            title: "Code Refactoring",
          },
          perf: {
            description: "A code change that improves performance",
            
            title: "Performance Improvements",
          },
          test: {
            description: "Adding missing tests or correcting existing tests",
            title: "Tests",
          },
          chore: {
            description: "Changes to the build process or auxiliary tools and libraries such as documentation generation",
            title: "Build System",
          },
          revert: {
            description: "Revert to a commit",
            title: "Reverts",
          },
        },
      },

    },
  },
};

module.exports = CommitLintConfiguration;
