---
layout: post
title: "[ASI|III|VC|SA] EasyFont v1.0 - TTF/OTF Font Replacement System"
date: 2026-07-26 12:00:00 +0530
category: gtamodding
tags: gta3 gtavc gtasa font text modding
---

**EasyFont v1.0** — TTF/OTF Font Rendering System that replaces the existing bitmap system for GTA III, VC, and SA.

<!--more-->

### Overview:
* Replace the bitmap font system used in the OG GTA Trilogy with high-quality replaceable TTF/OTF font equivalents!
* Try GTA game fontstyle defaults (or) try your favourite custom font styles!
* Game specific buttons – now PC buttons get their dedicated button sprites like console. Each game gets their own styled buttons.
* GInput support for controller buttons.
* Complex Unicode character support – up to 40 language character sets tested.
* FontStyleHooks – mapped the complete 60+ CFont::SetFontStyle calls in GTA3/VC/SA. Adjust their font styles on the go during runtime!
* Using FontStyleHooks – enable VCFontStyleHooks in GTA3 – allowing usage of 3 different fonts for HUD elements.
* With help of EasyGXT, bring localization support to any language across the globe. Latin and Unicode, Left to Right or Right to Left – both supported.

### Configurable Features:
- Assign up to 4 fonts across games.
- Button icons in place of button text.
- Blip icons in place of blip descriptions (VC/SA).
- Key to reload font settings in-game on the fly (Virtual Key code).
- Choose a Rendering method (1 = D3DX font sprite, 2 = GDI sprite).
- Replace text shadow with outline (1 = shadow size, >1 = exact thickness).
- Force uniform scaling for all fonts (1 = enable, 0 = disable).
- Force preconfigure default settings override for game style (-1 = off, 0 = GTA III, 1 = GTA VC, 2 = GTA SA, 3 = GTA IV, 4 = GTA V, 5 = GTA LCS, 6 = GTA VCS).
- Smooth outline quality (number of sampling points in a circle, e.g. 16).
- Outline size multiplier (defaults: 1.0f for III/VC, 2.0f for SA).
- Size scale multiplier of prompt buttons (default: 0.85).
- Override outline thickness (GTA SA only, -1 to disable).
- Enable Bidirectional & RTL layout support for Arabic/Hebrew/Urdu/Farsi (1 = enable, 0 = disable).
- Position offset (X Y) and scale multiplier for Health/Armor and Wanted star HUD symbols.
- Disable character slant/italic slant rendering (VC slanted location/vehicle texts).
- Follow natural character widths globally (1 = enable, 0 = disable).
- Global Y coordinate offset for text rendering.
- TrueType Font (.ttf or .otf) file name, character set index, font size, width, antialiasing quality, font weight, line height spacing multiplier.
- GXT token color adjustments (e.g. `~q~`).

### AddOns Included:
- **UITweaks (III/VC/SA)**: Plugin which patches key HUD elements to be more like Definitive Edition. Generates config to adjust values of those elements.
- **ReMessages.VC.asi**: Fixes a stack queue corruption associated with CMessages in GTAVC.

### Downloads:
- [NexusMods (III/VC/SA)](https://www.nexusmods.com/gtasanandreas/mods/3045)
- [Dropbox link (III/VC/SA v1.0)](https://www.dropbox.com/scl/fi/t1yw2ufkb4ijzddl756vz/III_VC_SA_EasyFont-v1.7z?rlkey=tcbbmtczg82ure8et621khtpc&st=xe9rjyri&dl=0)
- [Dropbox link (Details PDF)](https://www.dropbox.com/scl/fi/cxymeylztf374aajfdafx/EasyFont-v1.0.pdf?rlkey=38zxy6wvisdbu425uyyep9bjr&st=a14vm370&dl=0)

### Screenshots:
![Screenshot 1](https://gtaforums.com/uploads/monthly_2026_07/image.png.c7064f143de5ef873b1fdc53fcae9b3a.png)
![Screenshot 2](https://gtaforums.com/uploads/monthly_2026_07/image.png.5b84f0245ae869eff3ff3874e13beb23.png)
![Font Styles](https://gtaforums.com/uploads/monthly_2026_07/image.jpeg.ca029686a7e59b5e5f3ef3b0fc2409ba.jpeg)
![System Fonts](https://gtaforums.com/uploads/monthly_2026_07/image.jpeg.270a9495c4934704c791bdee0783544b.jpeg)
![Blip Icons](https://gtaforums.com/uploads/monthly_2026_07/image.jpeg.98aa97c4fc620bc127f1e1c1035cbfa6.jpeg)
![Tamil Translation](https://gtaforums.com/uploads/monthly_2026_07/image.png.8961c1b831ba1a4b2934081c30f231cc.png)
