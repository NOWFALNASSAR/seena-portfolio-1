# Seena Grace John — Portfolio Website

A live, editable portfolio site. Photos, videos, and Reel/YouTube links are
managed through a password-protected `/admin` page — no code editing needed
once it's set up.

- **Frontend:** Next.js 14 + Tailwind CSS
- **Media storage:** Cloudinary (free tier) — stores every photo and video
- **Hosting:** Vercel (free tier)
- **No separate database** — Cloudinary holds the media and a small config file

---

## 1. Create a free Cloudinary account

1. Go to https://cloudinary.com/users/register_free and sign up.
2. On your Dashboard (https://cloudinary.com/console), copy three values:
   - **Cloud name**
   - **API Key**
   - **API Secret** (click "reveal" if it's hidden)

Keep this tab open — you'll paste these into Vercel in step 3.

## 2. Push this project to GitHub

1. Create a new empty repository on GitHub (e.g. `seena-portfolio`).
2. From inside this project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/seena-portfolio.git
   git push -u origin main
   ```

## 3. Deploy on Vercel

1. Go to https://vercel.com/signup and sign up (using GitHub is easiest).
2. Click **Add New → Project**, and import the GitHub repo you just pushed.
3. Before clicking Deploy, open **Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `CLOUDINARY_CLOUD_NAME` | from step 1 |
   | `CLOUDINARY_API_KEY` | from step 1 |
   | `CLOUDINARY_API_SECRET` | from step 1 |
   | `ADMIN_PASSWORD` | a password you choose, for logging into `/admin` |
   | `ADMIN_SESSION_SECRET` | any long random string — see note below |

   To generate `ADMIN_SESSION_SECRET`, run this on your computer's terminal
   and paste the result:
   ```bash
   openssl rand -hex 32
   ```
   (No terminal handy? Any long, random 40+ character string works — mash
   the keyboard if you have to. It just needs to be unpredictable.)

4. Click **Deploy**. In about a minute you'll get a live link like
   `seena-portfolio.vercel.app`.

## 4. Connect your own domain

1. Buy the domain you want (e.g. `seenagracejohn.com`) from any registrar —
   Namecheap, GoDaddy, Google Domains, etc. Roughly $10–15/year.
2. In your Vercel project, go to **Settings → Domains** and add the domain.
3. Vercel will show you one or two DNS records to add. Go to your domain
   registrar's DNS settings and add exactly what Vercel shows you.
4. Wait 10 minutes to a few hours for DNS to update — then the domain
   points straight at your site.

## 5. Add the photos and videos

1. Visit `yourdomain.com/admin` (or `your-project.vercel.app/admin`).
2. Log in with the `ADMIN_PASSWORD` you set in step 3.
3. For each section (Hero, About, Bridal & Jewellery, Fashion & Editorial,
   Lifestyle, General Gallery, Showreel), upload the photos or short video
   clips you want there. You can add or remove them any time, from any
   device, without touching code again.
4. To add an Instagram Reel or YouTube video to the Showreel section, paste
   its link in the "Showreel links" box at the bottom of the admin page —
   no file upload needed for those.

**Notes on sections:**
- **Hero** and **About** each show a single photo — the most recently
  uploaded one is what displays. Upload a new one any time to swap it.
- **Bridal & Jewellery**, **Fashion & Editorial**, **Lifestyle**, and
  **General Gallery** show every photo/video uploaded to them, newest first.
- **Showreel** shows both uploaded video files and pasted Reel/YouTube links
  together.

## 6. Local development (optional)

If you want to preview changes on your own computer before they're live:

```bash
npm install
cp .env.local.example .env.local
# then fill in .env.local with your real Cloudinary values and a password
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin`
for the admin panel.

---

## A note on privacy

The admin page is protected by the password you set — don't share that
password publicly. Everything uploaded through it (photos, videos, Reel
links) becomes visible to anyone who visits the public site, so it's worth
a quick check with Seena before adding anything, especially anything you
wouldn't want searchable or shareable.

The contact details (phone, email) baked into the Contact section are
public the moment the site goes live — that's worth confirming she's
comfortable with too.
