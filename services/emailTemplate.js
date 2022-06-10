module.exports = ({emailFrom, download, size, expires}) => {
    return `
        <!doctype html>
        <html>
        <head>
        </head>
        <body>
            <h2>I am sharing one file with you. The size of this file is ${size}. For download the file please click <a href="${download}">here.</a>. This link will expires in ${expires} </h2>
        </body>
        </html>
    `
}