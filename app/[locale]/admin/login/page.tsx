import { redirect } from 'next/navigation';

export default function LocaleAdminLoginRedirect() {
  redirect('/admin/login');
}
