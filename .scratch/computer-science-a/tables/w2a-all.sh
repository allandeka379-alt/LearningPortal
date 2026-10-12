#!/bin/bash
cd "C:/Users/Lenovo/Downloads/Learning Platform"
node --no-warnings .scratch/computer-science-a/build-content.mjs w2a- | grep -v "^MCQ balance" | tail -30
