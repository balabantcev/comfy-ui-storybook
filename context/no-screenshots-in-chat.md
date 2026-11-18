---
name: no-screenshots-in-chat
description: User preference — do not post/embed screenshots in the chat
tags: [feedback, preference, workflow]
---

# No screenshots in chat

Do not embed or post screenshots (`preview_screenshot` images) into the chat.

**Why:** the user finds inline screenshot images noisy and doesn't want them duplicated into the conversation.

**How to apply:** still verify changes live, but use text-based verification — `preview_eval` (computed styles, DOM checks), `preview_console_logs`, `preview_logs`, `curl`. Report findings in text. Only produce a visual/screenshot if the user explicitly asks for one. See [[token-driven-components]] for the verification workflow this fits into.
