# Changelog
All notable changes to this project will be documented in this file.

## 4.0.0
### Added
- Unsanitize CSS (Pamasich): unsanitizes custom CSS on magazines to restore working functionality of custom styles
- Fix pagination arrows (Pamasich): fixes broken pagination arrows when navigating between pages by restoring functionality to the back/forward buttons
- Added a "Fixes" category to the sidebar that holds add-ons responsible for patches, fixes, and connecting glue

### Changed
- Mail label: this add-on was split into two, with the "Label submission" add-on being added
- Code syntax highlighting: now treats "Repair codeblocks" as a necessary dependency, so the act of turning on "Code syntax highlighting" will perforce turn on "Repair codeblocks"
- Move federation warning to sidebar: updated this add-on to also support profile pages
- Repair codeblocks: now treats "Code syntax highlighting" as dependent, so the act of turning off "Repair codeblocks" will perforce turn off "Code syntax highlighting"
- Resize text: the add-on now attempts to parse the current point size of elements on the page, rather than defaulting to 14pt
- Resize text: the add-on now gracefully toggles off without needing to reload the page
- Resize text: consolidated resize logic into a single stylesheet and dropped extraneous fields

### Fixed
- Audited all add-ons and added compatibility with mbin instances
- Releasing a click action on the KES sidebar while multiple pages were highlighted could break the menu
- GitHub's redirection and caching mechanism could cause the contents of the KES menu to appear garbled
- Add mail: fixed an issue where mail links would appear next to your own username
- Clarify recipient: recipient label now appears on the direct message page, not only the inbox reply page
- Code syntax highlighting: restored a missing divider line between the header and code block
- Code syntax highlighting: unintended interaction with "Collapsible comments" add-on was causing header icons to be unclickable
- Collapsible comments: fixed an issue where this add-on prevented the "code syntax highlighting add-on" from functioning correctly
- Hover indicator: fixed an issue where the indicator would not appear unless the add-on's color field had been explicitly interacted with
- Magazine instance names: disabling this add-on would remove checkmarks created by the "Checkmark on subbed mags" add-on
- Notification panel: fixed an issue where settings applied to the panel would sometimes leak into other menus
- Report bug button: this add-on now also applies to the original post in a thread, but not on crossposts

### API
- Added the keys depends_on and depends_off to manifest to support add-on dependencies
- Consolidated add-ons into global funcs.js file to reduce repository queries
- Added function concatenation script and ephemeral gist generator to build tools
- Added KES internal function getComputedFontSize() to retrieve rendered point size from element IDs
- Added public utility function getInstanceName() to test whether an instance is of the type kbin or mbin

## 3.3.0
### Added
- Show new features added in current release: click the button on the search menu to list new add-ons incorporated into KES since the current minor version. E.g., if you are on version 3.2.x, this button
  will show all relevant add-ons since 3.2.0. Under the hood, this button performs a query using the `:new` keyword.
- Search keywords: added a set of reserved keywords that can be used to search for add-ons matching certain criteria: `:new`, `:recurs`, and `:login`. These respectively will return a list of add-ons
  that are a) new to the current minor version; b) recur each time new content is updated on the page (comments, replies, infinite scrolling, etc.); and c) requires logging in to use.

### Changed
- Alpha sort add-ons in pages: the pages listing add-ons are now sorted alphabetically by add-on title
- Start search field focused: when opening the search menu, the text field is automatically focused

### Fixed
- Prevent add-ons from applying settings in some cases if the add-on is toggled off
- Hide logo: added support for Mbin instances
- Fixed cases where add-ons providing sub-settings initially set to true revert to false
- Fixed an issue where changes to kbin's styling caused extraneous checkmarks to be drawn next to checkboxes

## 3.2.3
### Fixed
- Expand post text in thread index: fixed another issue with expand button becoming hidden after collapsing text

## 3.2.2
### Fixed
- Expand post text in thread index: fixed an issue with extraneous newlines being inserted before and after a post body when fetching the remote text.

### Added
- Expand post text in thread index: added the ability to set custom text labels for the Expand, Collapse, and Loading states.

## 3.2.1
### Fixed
- Expand post text in thread index: fixed an issue with expand button becoming hidden after collapsing text

## 3.2.0
### Added
- Turbo mode support: propagate changes on both turbo and normal mode
- Sponsor button: jumps to GitHub Sponsors page
- Expand post text in thread index (shazbot): open the full body of a thread's OP without leaving the thread index
- Show thread/microblog delta since last visit (shazbot): adds an informational panel to the top of the page that prints post deltas

### Fixed
- Hotfix for 'Repair Lemmy code blocks' add-on
- Hotfix for mods failing to revert the background appearance of some pages (login, etc.)

## 3.1.0
### Added
- Sanitize code blocks federated from other instances (Pamasich)
### Fixed
- Restore browser default appearance of checkboxes and radio fields
- Label OP: properly show expected opacity (75%) of final label due to inherited opacity of parent element
- Alpha sort subs: properly align name/link when sorting usernames on followers list
- Reduce verbosity of log messages in some mods
### Changed
- Open links from KES window in new tab

## 3.0.0
### Added
- Softblock magazines (shazbot)
- Import/export global KES settings via backup menu
- Search by feature name: search for a mod (feature) by name and click to jump to its page
- API: new method of generating KES from atomic manifest objects
### Fixed
- Kbin Federation Awareness: make feature toggle dynamically without requiring refresh
- Label OP: make feature toggle dynamically without requiring refresh
- User instance names: drop unnecessary creation of observers on mutation events
- Magazine instance names: drop unnecessary creation of observers on mutation events
## 2.2.4
### Fixed
- Adjust appearance of ON/OFF toggles due to new kbin styling
## 2.2.3
### Fixed
- Undeclared variable in omnibar
- Restore federation awareness functionality per latest kbin update
## 2.2.2
### Fixed
- Hide posts: expanded images not being hidden along with post
## 2.2.1
### Fixed
- Navigation resetting on omnibar
## 2.2.0
### Added
- Subs omnibar (shazbot)
- NSFW blur disabler (shazbot)
- Customize colors (minnieo)
- Hover mod (minnieo)
- Checkmark next to subbed mags (shazbot)
- API: getHex()
- API: manifest generator
### Fixed
- Alpha sort list: also apply to followers page
- Display custom colors correctly in KES menus when user updates colors
- Notifications panel: fit into viewport on narrow mobile devices
- Hide thumbnails: restore default CSS when disabled on mobile
## 2.1.4
### Fixed
- Dropdown subscriptions: target hostnames other than kbin.social
- Notifications panel: target hostnames other than kbin.social
## 2.1.3
### Fixed
- Make notipanel button more clickable
- Merge unread message/thread notification counters into one count
- Cleanly restore message badges when notipanel is toggled off
## 2.1.2
### Fixed
- Initial support for FireMonkey extension
- Ensure hamburger menu opens correctly
- Make KES icon comply with hamburger menu styling
### Added
- API: support inheriting kbin theme vars when setting color input fields
## 2.1.1
### Fixed
- Notifications panel going missing due to change in upstream kbin CSS
### Added
- Support for incremental values in range sliders
## 2.1.0
### Added
- Resize fonts globally (minnieo)
- Hide threads permanently (shazbot)
- Mobile cleanup (Twelph)
- Move/hide federation warning (PrinzKasper)
- Always expand post bodies (shazbot)
- Clarify recipient on compose (shazbot)
- Rearrange thread element order (shazbot)
- Alpha sort subs list (shazbot)
- Add accessibility category
### Fixed
- Hamburger menu disappears when using toggle logo mod on mobile
- Alignment of wrench icon in hamburger menu
- Collapsible comments: several fixes for nested replies, reply threads 10+ comments deep, infinite scrolling
### Changed
- Notifications panel: smoother load and pagination
- Hide sidebar: show/hide specific elements of the sidebar, such as random posts/threads
- Hide thumbnails: granular toggles for thread index/inline thumbnails
- Notifier and settings icons: better visibility across all themes
### API
- Pass mutation events through to mods for parsing
## 2.0.7
### Fixed
- Settings icon on mobile view not visible on light themes
## 2.0.6
### Fixed
- Insert settings icon into proper part of hamburger menu on mobile
## 2.0.5
### Fixed
- Settings icon not visible on narrow mobile device screens
## 2.0.4
### Fixed:
- Navbar-icons-as-text: use kbin fallback font settings
## 2.0.3
### Fixed
- Add OP label: OP label appears on other usernames when OP replies in thread
- Navbar-icons-as-text: text does not respect browser defaults
### Added
- Navbar-icons-as-text: custom slider for font weight
- Added kbin.cafe to includes
## 2.0.2
### Fixed
- Restore dropped URL used when fetching updates
## 2.0.1
### Fixed
- KES not auto-updating in ViolentMonkey
## 2.0.0
### Added
- Transparent Mode: click the icon to see behind the KES menu and check changes on the page; click again to return
- Notifier on wrench icon if updates to KES are available
- Reset button: clear all saved KES settings and reset
- Clipboard button: copy system information to clipboard (for bug reports)
- Notifications Panel (blobcat): adds a navbar bell icon that opens notifications in an iframe
- Bug-report-from-post: post contents of a message directly to the KES bug tracker
- Support for multiple authors in attribution field
- Support for number field minimum, maximum, and step increments
- Debug page on sidebar
### Fixed
- Support across -monkey extensions (GM, TM, VM)
- Proper link format for authors on other instances
- Fix collision between kbin-federation-awareness and Improved Collapsible Comments when bubbles were enabled
- Show 'My Mags' link when using mobile view
- Make wrench icon easier to click on
### Security
- Parametric generation of script masthead
- Fix for KES menu contents missing on first-time boot
- Display fallback warning header if remote contents could not be fetched
- API: safeGM shim for inter-version compatibility
## 1.3.0
### Added
- kbin-federation-awareness mod
- Support ranges in input fields
## 1.2.2
### Fixed
- Highlight correct active navbar entry when using My Mags
## 1.2.1
### Fixed
- Wrench icon occludes navbar elements when magazine title is long
- Search icon goes missing when used in conjunction with KSP
## 1.2.0
### Added
- Changelog link in KES header (flask icon)
## 1.1.6
### Fixed
- User reputation not being hidden on user popover cards
## 1.1.5
### Fixed
- Navbar icons colliding with Kbin Subscriptions Panel icons on mobile
## 1.1.4
### Fixed
- Apply message links to other instances
- API: make getModSettings() accessible to calling scripts
## 1.1.2
### Fixed
- Support ViolentMonkey with GM_ prefix
## 1.1.1
### Fixed
- Change scope of variables
## 1.1.0
### Added
- Hide thumbnails mod
- Hide sidebar mod
- Custom navbar icons mod
## 1.0.0
Initial stable release
