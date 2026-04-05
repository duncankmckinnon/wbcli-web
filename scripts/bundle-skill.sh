#!/bin/bash
# Fetches all workbench skills from GitHub and bundles them into a downloadable zip.
# Runs as a prebuild step so the download always has the latest skills.
set -e

REPO="duncankmckinnon/workbench"
BRANCH="main"
BASE_URL="https://raw.githubusercontent.com/${REPO}/${BRANCH}/workbench/skills"
SKILLS=("use-workbench" "configure-workbench" "install-workbench")

TMPDIR=$(mktemp -d)
trap "rm -rf $TMPDIR" EXIT

for skill in "${SKILLS[@]}"; do
  mkdir -p "$TMPDIR/$skill"
  echo "Fetching $skill..."
  curl -sSfL "$BASE_URL/$skill/SKILL.md" -o "$TMPDIR/$skill/SKILL.md"
done

mkdir -p public/downloads
cd "$TMPDIR"
zip -r workbench-skills.zip "${SKILLS[@]}"
cd -
mv "$TMPDIR/workbench-skills.zip" public/downloads/workbench-skills.zip

echo "Bundled ${#SKILLS[@]} skills to public/downloads/workbench-skills.zip"
