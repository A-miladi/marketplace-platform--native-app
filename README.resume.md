# marketplace-platform--native-app (uniqalpha)

Repository: https://github.com/A-miladi/marketplace-platform--native-app

Short description

- A production-focused React Native marketplace app (TypeScript) including iOS and Android native projects. The app includes authentication, listing/advertisement flows, profile and chat features, and native integrations for media, geolocation and performance.

Key technologies / packages used

- React Native (0.76.x) + TypeScript
- Navigation: `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`
- State & hooks: `zustand`, custom hooks
- Network & API: `axios`
- Forms & validation: `react-hook-form`, `@hookform/resolvers`, `yup`
- Persistence: `@react-native-async-storage/async-storage`
- Internationalization: `i18next`, `react-i18next`
- Images & lists: `react-native-fast-image`, `@shopify/flash-list`, `react-native-svg`, `react-native-svg-transformer`
- Native integrations: `react-native-image-crop-picker`, `@react-native-community/geolocation`, `react-native-phone-number-input`
- UI & UX: `react-native-gesture-handler`, `react-native-reanimated`, `react-native-safe-area-context`, `react-native-flash-message`
- Tooling & testing: `jest`, `eslint`, `prettier`, `babel`, `react-test-renderer`

What I implemented / my role (resume-style bullets)

- Designed and implemented the app architecture and navigation structure (stack + bottom tabs) with a clear separation between `Auth` and main flows.
- Developed core screens and flows: authentication, advertisement listing, single-ad view, profile, sell flow, and messaging.
- Implemented state management using `zustand` for chat and user-related data and wrote reusable custom hooks for app logic.
- Integrated i18n (language detection and persistence using `AsyncStorage`) and provided translations setup using `react-i18next`.
- Implemented forms and client-side validation using `react-hook-form` and `yup` for robust input handling.
- Integrated native modules for media (image picker, FastImage), geolocation and phone input; handled CocoaPods setup for iOS and Gradle configs for Android.
- Improved performance for long lists using `@shopify/flash-list` and optimized image loading with `react-native-fast-image`.
- Added developer scripts and release helpers (Android assemble/bundle, iOS pod helpers) to streamline builds and CI usage.
- Wrote unit tests and configured Jest for component and utility testing; enforced formatting and linting with Prettier and ESLint.

How to run (short)

```bash
yarn install
cd ios && pod install && cd ..
yarn start
yarn ios   # or yarn android
yarn test
```

Notes for resume/CV

- Role: main developer / contributor (adjust title as needed)
- Mention specific contributions you want highlighted (e.g., performance tuning, native bridging, CI) and I can tailor the phrasing.
