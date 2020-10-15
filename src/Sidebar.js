import React from 'react'
import {List, Icon} from 'semantic-ui-react'
import './Sidebar.css'

const Sidebar = ({posts}) => {
    return (
        <List className='sidebar-list'>
          {posts.map(({ id, post }) => (
            <List.Item key={id}>
              <List.Content floated='right'><List.Header as='a'>Follow</List.Header></List.Content>
              <Icon avatar name='user secret' />
              <List.Content>
                <List.Header>{post.username}</List.Header>
              </List.Content>
            </List.Item>
          ))}
        </List>
    )
}

export default Sidebar
