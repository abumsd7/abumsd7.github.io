# Cloudflare Worker View Counter Setup Guide

This serverless view counter runs 100% free on Cloudflare Workers & KV (up to 100,000 free requests/day) and provides live view badges for your Jekyll blog posts.

---

## 🚀 Quick 2-Minute Setup in Cloudflare Dashboard

### 1. Create KV Namespace
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left sidebar, navigate to **Storage & Databases** $\rightarrow$ **KV**.
3. Click **Create Namespace**.
4. Set Namespace Name to: `POST_VIEWS`.
5. Click **Add**.

### 2. Create the Worker
1. In the left sidebar, go to **Compute (Workers)** $\rightarrow$ **Workers & Pages**.
2. Click **Create Application** $\rightarrow$ **Create Worker**.
3. Name your worker (e.g. `spilledout-views` or `post-views`).
4. Click **Deploy**.
5. Click **Edit Code**, delete existing code, and paste the contents of [`worker.js`](worker.js).
6. Click **Save and Deploy**.

### 3. Bind the KV Namespace to the Worker
1. Go back to your Worker's dashboard $\rightarrow$ **Settings** $\rightarrow$ **Variables**.
2. Scroll down to **KV Namespace Bindings** and click **Add binding**.
3. Configure:
   - **Variable name**: `POST_VIEWS` *(must match exactly)*
   - **KV namespace**: Select the `POST_VIEWS` namespace you created in step 1.
4. Click **Save and Deploy**.

### 4. (Optional) Custom Domain / Route
- Under **Settings** $\rightarrow$ **Triggers** $\rightarrow$ **Custom Domains**, click **Add Custom Domain** (e.g. `views.spilledout.cc`).
- Or use the default `https://<worker-name>.<your-subdomain>.workers.dev` URL.

### 5. Add URL to `_config.yml`
Open `_config.yml` in your blog repository and set:
```yaml
view_counter_api: "https://views.spilledout.cc" # Or your .workers.dev URL
```
