# GitHub Setup and Push Guide

This guide explains how to push this repository to GitHub cleanly and properly.

## 1) Create the repository on GitHub

1. Open GitHub in your browser.
2. Click the green `New repository` button.
3. Enter a repo name such as `speaking-EVAL`.
4. Choose:
   - Public or Private
   - Do not initialize with README, .gitignore, or license
5. Click `Create repository`.

## 2) Connect the local repo to GitHub

From the project folder, run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Example:

```bash
git remote add origin https://github.com/johnsmith/speaking-EVAL.git
git branch -M main
git push -u origin main
```

## 3) If the repo already has a remote

Run:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## 4) If GitHub asks for authentication

Use a personal access token if needed.

Typical steps:

```bash
git config --global user.name "YOUR_NAME"
git config --global user.email "YOUR_EMAIL@example.com"
```

Then push again:

```bash
git push -u origin main
```

## 5) Important repository hygiene

This repository already includes:

- a polished root README
- a GitHub profile README in `.github/profile/README.md`
- a clean `.gitignore`
- a version-controlled project structure

Keep your repo clean by avoiding large generated folders such as:

- node_modules/
- dist/
- .venv/
- __pycache__/
- uploads/

These are already ignored in `.gitignore`.

## 6) Recommended next steps

After the first push, you can:

- add a real project screenshot
- add a demo video or GIF
- connect your portfolio and LinkedIn in the profile README
- create a release tag
- add a LICENSE if needed

## 7) Optional: verify repo state

```bash
git status
git remote -v
```

## 8) Clean repository status

A healthy repo should look like this:

```bash
On branch main
nothing to commit, working tree clean
```

If you want a cleaner GitHub profile, edit the placeholders in:

- `.github/profile/README.md`

If you want a cleaner project page, edit:

- `README.md`
