export default function ({ store, redirect, route }) {
  if (!store.getters.isLoggedIn) {
    // لیستی از مسیرهایی که نیاز به لاگین دارند
    const restrictedRoutes = ['/warranty', '/warranty-list'];

    // اگر کاربر به یکی از این صفحات دسترسی پیدا کند و لاگین نباشد، او را به صفحه اصلی هدایت می‌کنیم
    if (restrictedRoutes.includes(route.path)) {
      return redirect('/');
    }
  }
}