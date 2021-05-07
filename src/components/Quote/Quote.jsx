import { withTheme } from "@twilio/flex-ui";
import React, { Component } from "react";
import {
  QuoteComponentStyled,
  Header,
  HeaderLine,
  QuoteAuthor,
  QuoteBody,
} from "./Quote.Styles";

const url = 'https://api.quotable.io/random?tags=life'

class QuoteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: null,
      author: null,
      loaded: false,
      error: null,
    };
  }

  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          quote: json.content,
          author: json.author,
          loaded: true,
        });
      })
      .catch((error) => this.setState({ error, loaded: true }));
  }

  render() {
    const { quote, author, error, loaded } = this.state;

    let value = quote;

    if (error) {
      console.log(error);
      value = `Error: ${error}`;
    }
    if (!loaded) {
      value = "Loading ...";
    }

    return (
      <QuoteComponentStyled>
        <HeaderLine>
          <Header>Quote of the Day</Header>
        </HeaderLine>
        <QuoteBody>{value}</QuoteBody>
        <QuoteAuthor>{author ? author : ""}</QuoteAuthor>
      </QuoteComponentStyled>
    );
  }
}

export default withTheme(QuoteComponent);
