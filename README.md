# 嗨赛智荐｜AI 体育赛事智能推荐系统（原型阶段）

一个基于 **React + TypeScript + Vite + Shadcn UI + TailwindCSS** 构建的体育内容推荐原型系统，探索如何将大语言模型（LLM）与用户行为建模结合，辅助用户获取更符合偏好的赛事推荐信息。

本项目仍在开发与测试阶段，欢迎交流与反馈。

---

## 🧩 项目目标

- 利用**通义千问**辅助意图识别，理解用户在自然语言中的真实需求；
- 构建用户行为画像，识别兴趣偏好、活跃时间段等核心标签；
- 打通推荐链路：从语义解析 → 用户建模 → 内容召回 → 推荐展示；
- 提供基础的推荐结果 UI 展示与事件详情交互体验。


## 🗂️ 项目结构（简要）

```bash
嗨赛智荐/
├── public/               # 静态资源
├── src/                  # 核心源码
│   ├── components/       # React UI 组件
│   ├── pages/            # 页面视图
│   ├── hooks/            # 自定义 Hooks
│   ├── services/         # 数据请求、模型调用逻辑（预留）
│   └── utils/            # 工具函数与上下文管理
├── index.html            # 应用入口 HTML
├── package.json          # 项目依赖与命令配置
├── tailwind.config.ts    # Tailwind 配置
├── vite.config.ts        # Vite 构建配置
└── README.md             # 项目说明文档
