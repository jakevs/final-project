import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
import API from "../components/utils/postAPI";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  form: {
    position: "absolute",
    right: 50,
    top: "28%",
  },
  postText: {
    width: 300,
    marginTop: 20,
  },
}));

function Post() {
  // Setting our component's initial state
  const [post, setPost] = useState([]);
  const [formObject, setFormObject] = useState({});

  useEffect(() => {
    loadPost();
  }, []);

  function loadPost() {
    API.getPost()
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }

  const classes = useStyles();

  return (
    <div>
      <Container fluid>
        <h1>Recent Posts</h1>
        {post.length ? (
          <List>
            <Paper className={classes.root}>
              <Grid container wrap="nowrap" spacing={2}></Grid>
              {post.map((post) => {
                return (
                  <ListItem key={post._id}>
                    <a href={"/post/" + post._id}>
                      <strong>
                        {post.title} by {post.name}
                      </strong>
                    </a>
                    <Button onClick={() => {}} />
                  </ListItem>
                );
              })}
            </Paper>
          </List>
        ) : (
          <h3>No Results to Display</h3>
        )}
      </Container>
      <Container fluid>
        <form noValidate autoComplete="off" className={classes.form}>
          <div>
            <TextField
              required
              id="standard-required"
              placeholder="Post subject"
            />
          </div>
          <div>
            <TextField
              label="Description"
              placeholder="Tell us what you need"
              multiline
              rows={4}
              variant="outlined"
              className={classes.postText}
            />
          </div>
        </form>
      </Container>
    </div>
  );
}

export default Post;
