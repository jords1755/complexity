# How to Create Your Pull Request: Step-by-Step Guide

## 🎯 What is a Pull Request?

A **Pull Request (PR)** is like saying:
> "Hey pnd280, I built this cool TTS download feature. Would you like to add it to your official Complexity extension?"

It's called a "pull request" because you're asking them to **pull** your changes into their repository.

---

## 🚀 Method 1: Quick & Easy (Recommended for Beginners)

### Step 1: Go to GitHub

Open your web browser and go to:
```
https://github.com/pnd280/complexity
```

This is the OFFICIAL repository (upstream).

---

### Step 2: Click "Pull Requests" Tab

At the top of the page, you'll see tabs:
```
< > Code    Issues    Pull requests    Actions    Projects    Wiki    Security    Insights
```

Click on **"Pull requests"**

---

### Step 3: Click "New Pull Request"

You'll see a big green button that says:
```
[New pull request]
```

Click it!

---

### Step 4: Set Up "Compare Across Forks"

By default, GitHub only looks within the same repository. Since your code is in YOUR fork, you need to:

1. Look for a link that says: **"compare across forks"**
2. Click it

Now you'll see 4 dropdown menus instead of 2!

---

### Step 5: Configure the Dropdowns

You need to tell GitHub: "Compare THEIR repo with MY repo"

#### Left Side (BASE - where code will go):
```
base repository: pnd280/complexity
base: nxt
```
**Translation:** "Add my changes to the 'nxt' branch of pnd280's repo"

#### Right Side (HEAD - where your code is):
```
head repository: jords1755/complexity
compare: feat/tts-download-plugin
```
**Translation:** "My code is in the 'feat/tts-download-plugin' branch of MY fork"

---

### Step 6: Review Your Changes

GitHub will now show you:
- ✅ "Able to merge" - Green checkmark (GOOD!)
- All the files you changed
- All the commits you made

**Visual representation:**
```
Comparing changes
✓ Able to merge. These branches can be automatically merged.

pnd280:nxt ← jords1755:feat/tts-download-plugin

Showing X changed files with X additions and X deletions.
```

Scroll down to review your code. Make sure:
- ✅ Only your TTS plugin files are changed
- ✅ The PR description looks good
- ✅ No unexpected changes appear

---

### Step 7: Click "Create Pull Request"

Big green button at the top:
```
[Create pull request]
```

Click it!

---

### Step 8: Fill in the PR Form

Now you'll see a form with two fields:

#### Title (Required)
```
feat: Add TTS Download Plugin
```

**Tips for good titles:**
- Start with a prefix: `feat:` (new feature), `fix:` (bug fix), `docs:` (documentation)
- Be concise but descriptive
- Use imperative mood: "Add" not "Added" or "Adds"

#### Description (Required)
Open the file `PR_DESCRIPTION.md` I created (it's in your repository root folder):

```bash
# You can view it with:
cat PR_DESCRIPTION.md
```

**Copy the ENTIRE contents** and paste it into the description box.

This description includes:
- ✅ Summary of the feature
- ✅ Technical details
- ✅ How to use it
- ✅ What files changed
- ✅ Testing notes
- ✅ Future enhancements

---

### Step 9: Optional Settings

Below the description, you might see:

#### Reviewers
- You can request specific people to review (optional)
- The repo owner will be notified automatically

#### Assignees
- You can assign yourself (shows you're taking ownership)

#### Labels
- Might not have permission to add (that's ok, repo owner can add them)

#### Projects/Milestone
- Usually handled by repo owner

**For your first PR, you can skip these!**

---

### Step 10: Create the Pull Request!

Big green button at the bottom:
```
[Create pull request]
```

Click it and... 🎉 **YOU'RE DONE!**

---

## 🚀 Method 2: Using Direct Link (Even Faster!)

Just visit this URL:
```
https://github.com/pnd280/complexity/compare/nxt...jords1755:complexity:feat/tts-download-plugin
```

This link automatically sets up:
- Base: pnd280/complexity:nxt
- Head: jords1755/complexity:feat/tts-download-plugin

Then just:
1. Click "Create pull request"
2. Add title and description
3. Submit!

---

## 📸 What the GitHub UI Looks Like

### Pull Request Page Structure
```
┌─────────────────────────────────────────────────────────┐
│  [Title field]                                          │
│  feat: Add TTS Download Plugin                         │
├─────────────────────────────────────────────────────────┤
│  [Description field - large text box]                  │
│  (Paste PR_DESCRIPTION.md contents here)               │
│                                                         │
│  ## Summary                                             │
│  This PR introduces...                                  │
│  ...                                                    │
└─────────────────────────────────────────────────────────┘

[Reviewers]  [Assignees]  [Labels]  [Projects]  [Milestone]

                         [Create pull request] ← Click!
```

---

## ✅ After You Create the PR

### What Happens Next?

1. **Automatic Checks Run**
   - CI/CD pipelines (automated tests)
   - Linters (code style checks)
   - Build verification
   - These appear as ✅ or ❌ next to your PR

2. **Repo Owner Gets Notified**
   - pnd280 receives an email
   - They see your PR in their notifications
   - They'll review when they have time

3. **Review Process**
   - Owner reads your code
   - May ask questions in comments
   - May request changes
   - May approve immediately!

4. **You Can Make Updates**
   - If they request changes, just:
     ```bash
     # Make the changes
     git add .
     git commit -m "fix: address review comments"
     git push
     ```
   - The PR automatically updates with new commits!

5. **Merge!**
   - If approved, repo owner clicks "Merge"
   - Your code becomes part of the official repository!
   - You're now a contributor! 🎉

---

## 💬 Common PR Etiquette

### Do's ✅
- ✅ Be respectful and professional
- ✅ Respond to feedback promptly
- ✅ Thank reviewers for their time
- ✅ Keep commits focused and logical
- ✅ Update PR if you find issues

### Don'ts ❌
- ❌ Don't force push (`git push -f`) unless asked
- ❌ Don't add unrelated changes
- ❌ Don't take criticism personally (it's about the code, not you)
- ❌ Don't spam or bump your PR repeatedly
- ❌ Don't argue excessively - it's their repo, they decide

---

## 🎓 Sample PR Comment Responses

### If They Ask for Changes
```
Thanks for the feedback! I'll make those changes and update the PR shortly.
```

### If They Approve
```
Thank you so much for reviewing and merging! Happy to contribute to this project.
```

### If You Need Clarification
```
Thanks for the review! Could you clarify what you mean by [specific point]?
I want to make sure I understand correctly before making changes.
```

### If They Suggest an Alternative Approach
```
That makes sense! I'll refactor it to use [their suggestion] instead.
Give me a day to update the PR.
```

---

## 🐛 Troubleshooting

### "There are conflicts"
**Means:** Your code and their code changed the same files
**Fix:**
```bash
git fetch upstream nxt
git merge upstream/nxt
# Fix conflicts manually
git commit
git push
```

### "Checks are failing"
**Means:** Automated tests found issues
**Fix:**
- Click on the failed check to see details
- Fix the issues in your code
- Push the fixes

### "Can't find my fork in the dropdown"
**Means:** You need to click "compare across forks" first
**Fix:** Look for the link and click it

### "PR already exists"
**Means:** You or someone else already created a PR from this branch
**Fix:** Find the existing PR and update it instead

---

## 📚 Helpful Resources

### GitHub Documentation
- [About Pull Requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [Creating a PR from a Fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)

### Quick Reference
```bash
# View your remotes
git remote -v

# Check current branch
git branch

# See commit history
git log --oneline -10

# Check status
git status

# View file differences
git diff upstream/nxt
```

---

## 🎯 Quick Checklist Before Creating PR

- [ ] Code is synced with upstream ✅ (We did this!)
- [ ] All changes are committed ✅ (We did this!)
- [ ] Changes are pushed to GitHub ✅ (We did this!)
- [ ] PR description is ready ✅ (We did this!)
- [ ] You understand what your code does ✅
- [ ] You tested the feature locally ✅ (I assume!)
- [ ] Code follows project conventions ✅ (Looks good!)

**You're ready! Go create that PR!** 🚀
