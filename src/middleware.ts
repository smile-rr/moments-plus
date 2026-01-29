import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  // 重定向 /admin 到 /admin/
  if (context.url.pathname === '/admin') {
    return context.redirect('/admin/', 301);
  }
  
  return next();
});
