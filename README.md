# Internship technical test

This project is made as part of my hiring process as a Fullstack intern at [Racemappr](https://www.racemappr.com/).

## The project consists of 3 parts:

- **Part 1:** Making a vanilla html and javascript page, the page must allow the user to do some action using an API.
- **Part 2:** The app made in part 1 must be made again this time using React, JSX must be used insteal of html/css, additional features may be added.
- **Part 3:** Next.js must be added on the project and hosted on Vercel, Tailwind must be used to style elements, additional features may be added.

**Deliverables**

- A working and accessible Next.js app
- A brief explanation of how the Next.js app works

# Part 1: Vanilla

The first step is defining what application I will make, after stumbling upon many APIs I decided to make an application based on the [Colormind API](http://colormind.io/api-access/) which provides palettes of matching colors.

I want the user to be able to generate a palette of colors until he is satisfied, I also want him to be able to copy easily in the clipboard the colors he is interested in. He should also be able to copy the wanted color in hexadecimal or rgb format.

My file structure will be:

- /
  - **index.html** `Holds the front-end code`
  - **server.js** `Holds the server code to host the application`
  - **static/**
    - **script.js** `Holds the color palette generator code`

### **Part 1 result**

For this part use `node server.js` to run the application.
Here's a screenshot of the part 1 result:

![vanilla_final](./images/part-1_final.png)

### **Thoughts**:

- I had some trouble loading static files on the server, at first I did not quite understood at first why it tried to load `script.js` with in the `text/html` as format
- I struggled a bit in converting rgb to hexadecimal format, for this precise function I assisted myself with [StackOverflow](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)
- I let on purpose a margin of improvement in order to add additional features in the next sections

# Part 2: React

This part is quite straightforward since this time I don't have to code the hosting part of the web application.

The main point here is adding new features, here's what I have in mind:

- User is able to _lock_ a section, meaning that further, generating a palette with affect exclusively not locked section, note that locking a color doesn't prevent it from being totally unchanged, locking a color will make the generator try to keep more or less the targetted color as it is
- Add a _copy to clipboard_ button next to the rgb and hex value
- User will be able to choose a _palette theme_ provided by the [Colormind API](http://colormind.io/api-access/)

### **Part 2 result**

For this part use `npm start` to run the application.
Here's a screenshot of the part 2 result:

![react_final](./images/part-2_final.png)

### **Thoughts**:

- This part was more straightforward than the first part since I didn't have do take care of the hosting of the app
- Creating and styling components was much easier
- I once again let a margin of omprovement for the last part

# Part 3: NextJS

This is the last part of this project, the final step consists of adding [NextJs](https://nextjs.org/) to the step-2 result. I also have to use [TailwindCSS](https://tailwindcss.com/) instead of JSX styling.

The final result will be hosted on Vercel, to make its access easier I plan on hosting temporarily on a custom endpoint of my [portfolio website](https://lennygarnier.com).

Here are the features that I want to add in this part:

- User will be able to change the section order
- User will be able to change the color of a section via a color picker placed on each section
- The current palette will be saved and thus will remain after refreshing or quitting the web application, I will be using react's `localStorage` hook to perform this

### **Part 2 result**

For this part use `npm dev` to run the application.
Here's a screenshot of the part 3 result:

![next_final](./images/part-3_final.png)

### **Thoughts**:

- This was the quickest part since I could reeuse my components from part-2
- I encountered a difficulty at then end: I chose this API because it didn't require an API key, meaning anyone could use the final product without being afraid of running out of available calls, the issue with this is that APIs that do not require an API key are usually encrypted as **http** and not **https**. Vercel-deployed app do not authorize calls to non-secure endpoints. To fix that you need to press the lock in your navbar and deactivate the secure connection as such:

![lock-1](./images/lock-1.png)
![lock-2](./images/lock-2.png)

The app is available at [this link](internship-technical-test.vercel.app)
