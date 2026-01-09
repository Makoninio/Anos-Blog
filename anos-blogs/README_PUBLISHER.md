# Publisher Guide (Ano's Blog)

This guide is for the main blog publisher. It explains how to sign in and manage content on the site.

## Access and Sign-In

- Go to `/admin/login` on the site.
- Click "Continue with Google".
- You must use an email that is on the admin allowlist.
  - If you cannot sign in, ask the site owner to add your email to `ADMIN_EMAILS`.

## Admin Dashboard

After signing in, go to `/admin` to see links for:
- Posts
- Authors
- Categories
- Currently Reading

## Posts

- Create: `Admin Dashboard -> Posts -> Create New Post`
- Edit: `Admin Dashboard -> Posts -> Edit`
- Delete: `Admin Dashboard -> Posts -> Delete`

Tips:
- Title is required.
- Slug is generated from the title.
- The main image is optional.
- Body is plain text in the editor unless you add richer content.

## Authors

- Add and edit author profiles for post attribution.
- If a post shows no author, edit the post and select one.

## Categories

- Create categories first, then assign them to posts.
- You can assign multiple categories to a post.

## Currently Reading

- Use this section to update the "currently reading" list on the site.

## Troubleshooting

- "Sign-in failed": your email is not on the allowlist or Google OAuth is misconfigured.
- "Unauthorized - Session not found": you are not signed in, or the session expired.
- Changes not showing: refresh the page; admin pages are real-time but can occasionally lag.

## Support

If you need access or help, contact the site owner.
