# gackt-ai-course1

This repository is a small Next.js app for a chat bot landing page.

## Deployment

1. Push the latest code to GitHub.
2. Create a new project on Vercel and connect it to this repository.
3. Set environment variables on Vercel:
   - `ANTHROPIC_API_KEY`
   - `ANTHROPIC_API_MODEL=claude-3.5`
   - `LINK_TOKEN=your_secret_link_token_here`
4. Deploy the project.

## Limited access setup

This project includes a private access flow:

- Visitors without a valid access cookie are redirected to `/auth`.
- Enter the access key on `/auth` to gain access.
- You can also use a direct link with `?access_token=your_secret_link_token_here` if desired.

## Local development

- Copy `.env.local.example` to `.env.local`
- Set your `ANTHROPIC_API_KEY` and `LINK_TOKEN`
- Run `npm run dev`

## Important

Do not commit `.env.local` to GitHub. The repository already ignores `.env.local`.

