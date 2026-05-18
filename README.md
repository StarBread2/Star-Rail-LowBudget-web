# Open World + Turn-Based RPG Prototype (HTML, CSS, JavaScript)

## Description

Experimental RPG prototype inspired by Honkai: Star Rail, rebuilt from the original SFML C++ version into a browser-based project using only vanilla HTML, CSS, and JavaScript, no frameworks or external game engines.

This version focuses on combining open-world exploration with turn-based combat mechanics while keeping the implementation framework-free.

> Status: Unfinished



## Features

### Open World

- Open-world movement system with collision detection
- Custom procedural animation system for all characters
- Enemy AI with proximity-based aggro and delayed attack gauge system before combat initiation
- Enemies return to their original position after disengaging
- Pet companion system with selectable buffs
- Local 2-player support

### Turn-Based Combat

- Speed-based turn order system
- Basic attack, skill, and ultimate mechanics
- Enemy targeting system
- Combat UI toggle
- Custom animations and models created in Blender



## Built With

- HTML
- CSS
- JavaScript (Vanilla)
- Blender



## Controls

### Open World

| Key | Action |
| --- | --- |
| **W, A, S, D** | Player movement |
| **Shift** | Run |
| **1, 2, 3, 4** | Change pet |
| **↑ ↓ ← →** | 2nd player movement |
| **/** | 2nd player run |
| **Left Click** | Attack |
| **Enter** | Exit turn-based mode (after winning) |

### Turn-Based Combat

| Key | Action |
| --- | --- |
| **Q** | Basic Attack |
| **E** | Skill |
| **4** | Ultimate |
| **← / →** | Select enemy |
| **Space** | Use ultimate on selected enemy |
| **Left Click** | Hide UI |



## Pet Buffs

| Pet | Buff |
| --- | --- |
| **1** | SP = 5 |
| **2** | Energy at start = 100 / 150 |
| **3** | +500 ATK |
| **4** | +30% Crit Rate |



## Notes

- This project is a rewrite of the original SFML C++ prototype into a pure web-based implementation
- The challenge for this version was to avoid using frameworks or external game engines
- Some systems and features are still incomplete



## External Assets

Due to file size limitations, animation assets are hosted externally.

### Turn-Based Animation Files

SpriteSheet For Game (Updatedyawa)  
https://drive.google.com/drive/folders/1mAFNRrzT6LZ7yCtCnrvAcNZtTxO7Jq1i?usp=sharing

Place the extracted files in the project's root directory.

### Open World Animation Files

Open World Sprites  
https://drive.google.com/drive/folders/11BV5d_SsmG4N58jPBt1lk103mRaErtxZ?usp=sharing

Place the extracted files inside:
```text
/Open World Files/
