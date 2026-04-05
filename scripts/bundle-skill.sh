#!/bin/bash
# Bundles the use-workbench skill into a downloadable zip for the website.
# Runs as a prebuild step to stay in sync with the repo.
set -e
mkdir -p public/downloads
zip -r public/downloads/use-workbench-skill.zip .agents/skills/use-workbench/
echo "Bundled use-workbench skill to public/downloads/use-workbench-skill.zip"
