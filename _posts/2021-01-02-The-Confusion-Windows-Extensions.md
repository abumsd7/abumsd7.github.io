---
layout: post
title: Confusions related to default extension Settings in Windows
date: 2021-01-02 13:10:00 +0530
tags: explanatory technology
---

Smartphones have overtaken Desktops and laptops in general usage.  

They are also turning into pocket productivity devices. Any of the long existing facilities in a PC are being ported to them, in additional to exclusive features which make use of the handheld touch ecosystem established by them.  
<!--more-->
However, as much as one would think about the rapid growth of smartphone usage, one can't argue about
it's heavy-duty handling capabilities. The highest memory load one could put on a smartphone is by playing graphics-intensive videogames.  

Not really productive, isn't it?  

Unfortunately that is the maximum "interesting" strain that could be put on them. I put an emphasis on "interesting" because mundane benchmark tests are also available to exert the maximum out of your premium handheld. For all the talk about multiple gigs of RAM and clockspeed, battery life is of the atmost priority to a consumer and these powerful players take a backseat when it comes to real, authentic multitasking. Maybe it's a problem of the operating system as a whole.  

But one thing I personally like about the file exploration system is that they provide a direct look at the file extension of the file you have stored on it.  

### What is a file extension?

- A three or four letter shortened word of the filetype.
- Consider that we have downloaded a Word Document.
- After the filename followed by a dot, we will be able to see this file extension.
- This file extension not only briefs the filetype, but also allows you to change it.
- A .txt file can be changed into any of your favourite programming language source files, since they are an encoded text file at their core.
- Same can't be done for application exclusive file extensions such as .docx, .pptx, etc. The content in them will differ and thus changing the extension will only result in an unusable file.  

### What is the problem with Windows extensions?

Windows has the largest share of desktop and laptop operating systems. It's been used extensively by not only the business crowd, but also by the everyday consumer crowd. Microsoft offers you the freedom to be a poweruser by giving various options to tweak the OS to your tastes. At the same time, for a novice, they provide you with all the necessary helping slides and customer support. They also keep the default OS settings simple and unobtrusive.  

One of their **unobtrusive** design options is to hide the file extensions by default, as many new users face the danger of accidentally removing the file extensions during renaming. This could lead to an unusable file and uncontrollable panic on the side of the novice.  

Without these file extensions, Windows instead shows you the type of file in the File Explorer. While this might sound as a better option, think about the fact that these fite types differ based on each default program.  

Here is an example for a PDF file.  
- A PDF file is represented by .pdf extension.
- If Chrome browser is chosen as the default program, then the type will be displayed as "Chrome HTML Document" (completely unrelated to the well known PDF name).
- If we open it with a PDF reader program such as Adobe, it will show the filetype as "Adobe PDF Presentation" (doubt on it's accuracy)
- On worst case scenarios when there is no default program on instance of a new installation, it would be unrecogized and simply display the
filetype as just "File".  

File compression has been heavily used ever since the Internet came into existence. By allowing us to group multiple files into a single one and reducing the file size, they were a convenient way to share files. Newer iterations of Windows ( since Vista/7 ?) offer support to .zip compressions. They will be shown as the "Compressed Folder" filetype. However, there are many other type of compression methods such as .rar, 
.7z, etc. which have their own decompression software. Again if a Windows user misunderstands that his PC can open compressed files, he will face the unusable file issue. I myself have seen people who have no idea on how these compression software work.  

### The solution
Till now Microsoft are not considering it as a serious issue, as it's **actually not serious**. But, they have the code in their hands to do the one minor change and that is to **enable file extension display** by default.  

If you are interested in enabling file extensions ( if it was diabled ), follow the instructions.  

- In your Start Menu / Start Screen search bar, type "File Explorer Options"  
- ![FileExtensions]({{ site.baseurl }}/images/extension_1.jpg)
- Click the "View" tab.
- Uncheck "Hide file extensions for known types"
- Apply and OK.  
- ![FileExplorerOptions]({{ site.baseurl }}/images/extension_2.jpg)
