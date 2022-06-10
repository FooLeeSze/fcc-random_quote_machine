import React from 'react'
import twitterIcon from './images/icons8-twitter-60-crop2.svg'
import copyIcon from './images/copy.svg'

// Quotable API link to get random quote
const api_url = "https://api.quotable.io/random";

// Function that generates string of quote + author in correct format
function genFullQuote(quote, author) {
    return ("\"" + quote + "\" -" + author)
}

class QuoteBox extends React.Component {
    constructor(props) {
        super(props);

        // Initialize state
        this.state = {
            quote: '',
            author: '',
            fetchComplete: false
        }

        this.newQuote = this.newQuote.bind(this);
        this.copyText = this.copyText.bind(this);
    }

    // Get first quote
    componentDidMount() {
        this.newQuote();
    }

    // Get new quote on clicking of "New quote" button
    async newQuote() {
        try {
            fetch(api_url)                      //Fetch random quote
                .then(data => data.json())
                .then(data => {
                    this.setState({
                        quote: data.content,    // Update state
                        author: data.author,
                        fetchComplete: true
                    })
                });
        } catch (error) {
            console.error('Failed to fetch quote')
        }
    }

    // Copy quote to clipboard on clicking "Copy link" button
    // Then pop up an alert to notify user
    copyText() {
        navigator.clipboard.writeText(genFullQuote(this.state.quote, this.state.author));

        document.getElementById('copy-alert-container').style.display = 'block';
        setTimeout(() => document.getElementById('copy-alert-container').style.display = 'none', 2000);
    }

    render() {
        var renderThis;
        // If done fetching quote, render the quote box
        // else, render loading text
        if(this.state.fetchComplete) {
            renderThis = (
                <div  id="quote-box">
                    <h1 id='text'><span className="quote-symbol">"</span>{this.state.quote}<span className="quote-symbol">"</span></h1>
                    <p id="author">{"- " + this.state.author}</p>
                    <button id="new-quote" onClick={this.newQuote}>New quote</button>
                    <div id="share">
                        <a target="_blank" rel="noreferrer" id="tweet-quote" className="share-button" href={"https://twitter.com/intent/tweet?text=" + genFullQuote(this.state.quote, this.state.author)} title="Tweet quote"><img className="share-icon" id="twitter-icon" src={twitterIcon} alt="" /></a>
                        <button id="copy-text" className="share-button" title="Copy quote"><img className="share-icon" id="copy-icon" src={copyIcon} alt="" onClick={this.copyText} /></button>
                    </div>
                    <div id="copy-alert-container">
                        <p id="copy-alert">Copied to clipboard!</p>
                    </div> 
                </div>
            )
        } else {
            renderThis = (
                <h3 id="loading-text">Asking a philosopher...</h3>
            )
        }

         return (
            <section id="main-content">
                {renderThis}
            </section>
        )
    }
}

export default QuoteBox