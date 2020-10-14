import React from "react"
import { Card, Icon, Image, Label, Comment } from "semantic-ui-react"
import './Post.css'

const Post = ({username,image,caption}) => {

  return (
    <div className='post'>
      <Card className='post-card' fluid>
        <Card.Content>
          <Image
            floated='left'
            size='mini'
            src='/img1.jpg'
            avatar
          />
          <Card.Header>{username}</Card.Header>
          
          <Image
            src={image}
            wrapped
            ui={true}
            className='post-image'
          />
          <Card.Header className='post-actions'>
            {" "}
            <Label>
              <Icon name='mail' /> 23
            </Label>{" "}
            <Label>
              <Icon name='mail' /> 23
            </Label>
          </Card.Header>
          <Card.Description>
  <span className=''>{username}</span>{caption}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Comment>
            <Comment.Content style={{ display: "flex", alignItems: "center" }}>
              <Comment.Avatar
                as='a'
                src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'
              />
              <Comment.Author as='a'>Matt</Comment.Author>

              <Comment.Text floated='right'>How artistic!</Comment.Text>
            </Comment.Content>
          </Comment>
        </Card.Content>
      </Card>
    </div>
  )
}

export default Post
