export enum AuthorizationScreen {
  LOGIN = 'LoginScreen',
  REGISTRATION = 'RegistrationScreen',
  WELCOME = 'WelcomeScreen',
  WHERE_YOU_GO = 'WhereYouGoScreen',
  CHOOSE_EDUCATION = 'ChooseEducationScreen',
  LOCATION = 'LocationScreen',
  FORGOT_PASSWORD = 'ForgotPasswordScreen',
  CONFIRM_EMAIL = 'ConfirmEmailScreen',
  RESET_PASSWORD = 'ResetPasswordScreen',
  ROLE_SELECTION = '??????????????/',
}

export enum HomeScreen {
  MAIN = 'MainScreen',
  FIND = 'FindScreen',
  FILTER = 'FilterScreen',
  UNIVERSITY_INFORMATION = 'UniversityInformationScreen',
  COMPARISON = 'ComparisonScreen',
}

export enum WishlistPath {
  SAVED_UNIVERSITY = 'SavedUniversityScreen',
  WISHLIST_UNIVERSITY = 'WishlistUniverse',
  WISHLIST_UNIVERSITY_DETAIL = 'WishlistUniverseDetail',
  WISHLIST_NEWS_DETAIL = 'WishlistNewsDetail',
  WISHLIST_NEWS = 'WishlistNews',
}

export enum TreckerScreen {
  TRACKER = 'TrackerScreen',
  ABITURIENT = 'AbiturientScreen',
}

export enum ProfileScreen {
  USER = 'UserScreen',
  EDIT_MY_INTEREST = 'editMyInterestScreen',
  EDIT_PROFILE = 'EditUserScreen',
  SETTINGS = 'SettingsScreen',
  WHERE_YOU_GO_SETTINGS = 'WhereYouGoScreenSettings',
  CHOOSE_EDUCATION_SETTINGS = 'ChooseEducationScreenSettings',
  LOCATION_SETTINGS = 'LocationScreenSettings',
  RESULTS_NMT = 'ResultsNMTScreen',
  MY_POSTS = 'MyPostsScreen',
}

export enum StackScreenBottomMenu {
  AUTHORIZATION = 'AuthorizationStack',
  HOME = 'HomeStack',
  Opportunities = 'OpportunitiesStack',
  OpportunitiesMain = 'OpportunitiesStackMain',
  OpportunitiesTabs = 'OpportunitiesStackTabs',
  OpportunitiesMenu = 'OpportunitiesStackMenu',
  OpportunitiesDetail = 'OpportunitiesDetail',
  OpportunitiesAddedUser = 'OpportunitiesAddedUserStack',
  WISHLIST = 'WishlistPath',
  WISHLIST_UNIVERSITY = 'WishlistUniversityPath',
  WISHLIST_OPPORTUNITIES = 'WishlistOpportunitiesPath',
  TRACKER = 'TrackerScreen',
  PROFILE = 'ProfileScreen',
  FIND = 'FindStack',
  SESSION = 'SessionStack',
  ONBOARDING = 'OnboardingStack',
}

//  Нужно доработать, Не было

export enum OnboardingScreen {
  FULL_CONTROL = '?',
  CREATE = '?',
  BILATERAL = '?',
}
