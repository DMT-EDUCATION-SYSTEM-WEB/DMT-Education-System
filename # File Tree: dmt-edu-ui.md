# File Tree: dmt-edu-ui

Generated on: 8/12/2025, 8:29:10 AM
Root path: `/Users/nguyenhuuthang/Documents/RepoGitHub/DMT-System-Web/dmt-edu-ui`

```
├── .git/ 🚫 (auto-hidden)
├── .vscode/ 🚫 (auto-hidden)
├── DMT Education_Logo/
│   ├── .DS_Store 🚫 (auto-hidden)
│   ├── LOGO DMT FINAL-05.png
│   ├── LOGO DMT FINAL-06.png
│   ├── LOGO DMT FINAL-08.png
│   ├── LOGO DMT-01.png
│   ├── LOGO DMT-02.png
│   └── LOGO DMT-04.png
├── dist/ 🚫 (auto-hidden)
├── node_modules/ 🚫 (auto-hidden)
├── public/
│   ├── confident-teacher-explaining-lesson-pupils.jpg
│   ├── favicon.ico
│   ├── front-view-school-covid-concept.jpg
│   ├── index.html
│   ├── little-classmates-discussing-lesson-doing-task.jpg
│   ├── logo-dmt.png
│   ├── manifest.json
│   └── young-boy-playing-aviator-toy-air-plane-imagination-dreaming-being-pilot-future-business-district-urban.jpg
├── src/
│   ├── animations/
│   │   └── index.tsx
│   ├── components/
│   │   ├── charts/
│   │   │   └── index.ts
│   │   ├── common/
│   │   │   ├── AnimatedCard.tsx
│   │   │   ├── BackgroundSection.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── GlobalPerformanceMonitor.tsx
│   │   │   ├── Icons.tsx
│   │   │   ├── Icons_new.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── LazyImage.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Notification.tsx
│   │   │   ├── OptimizedCard.tsx
│   │   │   ├── OptimizedComponents.tsx
│   │   │   ├── ResponsiveComponents.tsx
│   │   │   ├── SEOHead.tsx
│   │   │   ├── ScrollComponents.tsx
│   │   │   ├── SkeletonLoaders.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── SuspenseWrapper.tsx
│   │   │   └── index.ts
│   │   ├── forms/
│   │   │   └── index.ts
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── lazy/
│   │   │   └── index.ts
│   │   ├── sections/
│   │   │   ├── AboutSection.tsx
│   │   │   ├── AchievementsSection.tsx
│   │   │   ├── AnnouncementBanner.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── CoursesSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── FooterSection.tsx
│   │   │   ├── HeaderComponent.tsx
│   │   │   ├── HeaderSection.tsx
│   │   │   ├── Hero_New.tsx
│   │   │   ├── NewsSection.tsx
│   │   │   ├── ScheduleSection.tsx
│   │   │   ├── SponsorsSection.tsx
│   │   │   ├── TeacherReviewsSection.tsx
│   │   │   └── index.ts
│   │   └── tables/
│   │       ├── ReportTable.tsx
│   │       └── index.ts
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── features/
│   │   ├── admin/
│   │   │   ├── pages/
│   │   │   │   ├── Analytics.tsx
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Notifications.tsx
│   │   │   │   ├── Roles.tsx
│   │   │   │   ├── Settings.tsx
│   │   │   │   ├── Settings_new.tsx
│   │   │   │   └── Users.tsx
│   │   │   └── api.ts
│   │   ├── analytics/
│   │   │   └── pages/
│   │   │       └── Reports.tsx
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── TwoFactor.tsx
│   │   │   │   └── Unauthorized.tsx
│   │   │   └── api.ts
│   │   ├── courses/
│   │   │   ├── pages/
│   │   │   │   ├── Catalog.tsx
│   │   │   │   └── Detail.tsx
│   │   │   └── api.ts
│   │   ├── notifications/
│   │   │   └── api.ts
│   │   ├── payments/
│   │   │   └── api.ts
│   │   ├── schedule/
│   │   │   ├── pages/
│   │   │   │   └── Calendar.tsx
│   │   │   └── api.ts
│   │   ├── staff/
│   │   │   ├── pages/
│   │   │   │   ├── Support.tsx
│   │   │   │   └── Tasks.tsx
│   │   │   └── api.ts
│   │   ├── students/
│   │   │   ├── pages/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Materials.tsx
│   │   │   │   ├── Schedule.tsx
│   │   │   │   ├── Transcript.tsx
│   │   │   │   └── Videos.tsx
│   │   │   └── api.ts
│   │   ├── support/
│   │   │   └── pages/
│   │   │       └── Tickets.tsx
│   │   ├── surveys/
│   │   │   ├── pages/
│   │   │   │   └── SurveyList.tsx
│   │   │   └── api.ts
│   │   └── teachers/
│   │       ├── pages/
│   │       │   ├── Assignments.tsx
│   │       │   ├── Grading.tsx
│   │       │   ├── Surveys.tsx
│   │       │   └── Timesheet.tsx
│   │       └── api.ts
│   ├── guards/
│   │   └── RequireRole.tsx
│   ├── hooks/
│   │   ├── useAdvancedAnimation.ts
│   │   ├── useAuth.ts
│   │   ├── useOptimizedAnimation.ts
│   │   ├── usePagination.ts
│   │   ├── usePerformance.ts
│   │   ├── useResponsive.ts
│   │   └── useTouch.ts
│   ├── i18n/
│   │   ├── en.json
│   │   └── vi.json
│   ├── routes/
│   │   └── index.tsx
│   ├── services/
│   │   ├── admin.ts
│   │   ├── auth.ts
│   │   └── http.ts
│   ├── store/
│   │   ├── slices/
│   │   │   └── userSlice.ts
│   │   └── index.ts
│   ├── styles/
│   │   ├── critical.css
│   │   ├── global.css
│   │   ├── optimized-animations.css
│   │   └── tailwind.css
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── animations.ts
│   │   ├── formatters.ts
│   │   ├── helpers.ts
│   │   ├── index.ts
│   │   ├── performance.ts
│   │   └── validators.ts
│   ├── App.tsx
│   ├── constants.ts
│   └── main.tsx
├── styles/
│   └── optimized-animations.css
├── .DS_Store 🚫 (auto-hidden)
├── .env.example
├── .eslintrc.cjs
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── Database-DMT-System.sql
├── Dự án Website Trung tâm DMT.txt
├── README.md
├── SimpleApp.tsx
├── index.html
├── package-lock.json 🚫 (auto-hidden)
├── package.json 🚫 (auto-hidden)
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json 🚫 (auto-hidden)
├── tsconfig.node.json 🚫 (auto-hidden)
└── vite.config.ts
```

---
*Generated by FileTree Pro Extension*