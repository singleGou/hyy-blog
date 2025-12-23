## setting.json

```json
// -------------- 编辑器行为 --------------
{
  "editor.fontSize": 15,
  "editor.lineHeight": 22,
  "editor.wordWrap": "on",           // 视觉拆行，不会出现横向滚动条，不改变文件内容
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": false, // 强制用项目缩进
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",

  // -------------- 文件 / 资源管理器 --------------
  "files.associations": {
    "*.env.*": "dotenv"
  },
  "files.exclude": {
    "**/*.log": true,
    "**/dist": true
  },
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 500,

  // -------------- Git --------------
  "git.enableSmartCommit": true,
  "git.confirmSync": false,
  "git.untrackedChanges": "separate", // 未跟踪文件单独放

  // -------------- ESLint + Prettier 联动 --------------
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": ["javascript", "typescript", "vue"],
  "prettier.requireConfig": true, // 无配置文件就不格式化
  "prettier.useEditorConfig": false,

  // -------------- TypeScript --------------
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",

  // -------------- Vue --------------
  "vetur.validation.template": false, // 禁用 Vetur（用 Volar）
  "vue.inlayHints.missingProps": true,
  "vue.complete.casing.tags": "kebab", // 自动补全用 kebab-case

  // -------------- 终端 --------------
  "terminal.integrated.fontSize": 14,
  "terminal.integrated.defaultProfile.windows": "PowerShell",

  // -------------- 主题 / 图标 --------------
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "vscode-icons",
  "editor.cursorBlinking": "phase"
}
```



```json
{
  "editor.tabSize": 2,
  "eslint.run": "onSave",
  "editor.autoIndent": "full",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.tslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  },
  "editor.accessibilitySupport": "off",
  "eslint.alwaysShowStatus": true,
  "eslint.codeAction.showDocumentation": {
    "enable": true
  },
  "vetur.format.options.tabSize": 2,
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      // - auto: 仅在超出行长度时才对属性进行换行
      // - force: 对除第一个属性外的其他每个属性进行换行
      // - force-aligned: 对除第一个属性外的其他每个属性进行换行，并保持对齐
      // - force-expand-multiline: 对每个属性进行换行
      // - aligned-multiple: 当超出折行长度时，将属性进行垂直对齐
      "wrap_attributes": "auto", // 属性折行对齐方式
      "wrap_line_length": 200, // 最多容纳多少个字符，开始换行
      "end_with_newline": false
    },
    "prettier": {
      "semi": true,
      "singleQuote": true,
      "trailingComma": "none",
      "eslintIntegration": true
    }
  },
  "vetur.validation.template": false,
  "vetur.format.defaultFormatter.pug": "prettier",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.postcss": "prettier",
  "vetur.format.defaultFormatter.scss": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
  "vetur.format.defaultFormatter.sass": "sass-formatter",
  "prettier.useEditorConfig": false,
  "prettier.configPath": ".prettierrc",
  "prettier.tabWidth": 2, // 指定一个制表符等于的空格数
  "prettier.printWidth": 200, // 超过最大值换行
  "prettier.singleQuote": true, //使用单引号
  "prettier.semi": true, //加分号
  "prettier.endOfLine": "auto",
  "prettier.trailingComma": "all", // 加尾逗号 none|es5|all
  "prettier.useTabs": false,
  "javascript.format.insertSpaceAfterCommaDelimiter": false,
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true, // 让函数名和后面的括号之间加个空格
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[nginx]": {
    "editor.defaultFormatter": "ahmadalli.vscode-nginx-conf"
  },
  "files.associations": {
    "*.template": "handlebars",
    "*.wxml": "wxml",
    "*.xml": "xml"
  },
  "typescript.tsdk": "node_modules\\typescript\\lib",
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "path-intellisense.mappings": {
    "@images": "${workspaceRoot}/src/assets/images",
    "~@images": "${workspaceRoot}/src/assets/images",
    "@": "${workspaceRoot}/src"
  },
  "fileheader.Author": "huyuyi",
  "fileheader.LastModifiedBy": "huyuyi",
  "git.autofetch": true,
  "git.suggestSmartCommit": false,
  "git.enableSmartCommit": true,
  "liveServer.settings.port": 5000,
  "grunt.autoDetect": "off",
  "workbench.colorTheme": "One Monokai",
  "workbench.editor.enablePreview": false,
  "workbench.iconTheme": "vscode-icons",
  "workbench.editorAssociations": {
    "*.b3dm": "default",
    "*.svg": "hediet.vscode-drawio-text",
    "*.drawio": "hediet.vscode-drawio-text"
  },
  "workbench.startupEditor": "none",
  "svn.path": "D:\\Program Files\\TortoiseSVN\\bin\\svn.exe",
  "vsicons.dontShowNewVersionMessage": true,
  "json.schemaDownload.enable": false,
  "extensions.ignoreRecommendations": true,
  "Codegeex.License": "",
  "explorer.compactFolders": false,
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "roo-cline.allowedCommands": ["npm test", "npm install", "tsc", "git log", "git diff", "git show"],
  "[yaml]": {
    "editor.defaultFormatter": "redhat.vscode-yaml"
  },
  "database-client.autoSync": true,
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": false,
    "scminput": false,
    "javascript": false,
    "vue": true
  },
  "github.copilot.nextEditSuggestions.enabled": true,
  "editor.formatOnSave": true,
  "workbench.settings.applyToAllProfiles": [],
  "workbench.editor.empty.hint": "hidden"
}
```

