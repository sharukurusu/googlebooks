import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import BookIcon from '@material-ui/icons/Book';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import API from "../utils/API";
import { Link } from "react-router-dom";


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  link: {marginLeft: '10px'},
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

class Saved extends Component {
    state = {
        books: []
    };

    componentDidMount() {
        this.loadBooks();
    }
    
    loadBooks = () => {
        API.getBooks()
            .then((res) => {
                console.log(res.data)
                this.setState({books: res.data})
                // this.setState({ books: res.data.items, title: "", author: "", synopsis: "" })
            })
            .catch(err => console.log(err));
    };

    deleteBook = id => {
        API.deleteBook(id)
          .then(res => this.loadBooks())
          .catch(err => console.log(err));
    };
    
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
        [name]: value
        });
    };

    render(){
        const { classes } = this.props;
        return (
            <React.Fragment>
            <CssBaseline />
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                <BookIcon className={classes.icon} />
                <Typography variant="h6" color="inherit" noWrap>
                    Google Books
                </Typography>
                <Link to="/" className={classes.link}>Search</Link>
                <Link to="/saved" className={classes.link}>Saved</Link>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroUnit}>
                <div className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    (React) Google Books: Saved
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                    View Your Saved Books!
                    </Typography>
                </div>
                </div>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                {/* End hero unit */}
              
                <Grid container spacing={40}>
                    {this.state.books.map(book => (
                    <Grid item key={book._id} sm={12} md={6}>
                        <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={book.image || "https://via.placeholder.com/640x480.png?text=No+Cover+Available"}
                            title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {book.title}
                            </Typography>
                            <Typography variant="h6" component="h3">
                            {book.authors.join(", ")}
                            </Typography>
                            <Typography>
                            {book.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button href={book.link} size="small" color="primary">
                            View
                            </Button>
                            <Button onClick={() => this.deleteBook(book._id)} size="small" color="primary">
                            Delete
                            </Button>
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </div>
            </main>
            </React.Fragment>
        );
    }
}

Saved.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Saved);