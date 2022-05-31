import React from 'react'
import {
  Grid,
  Input,
  Text,
  Button,
  Spacer,
  Card,
  Description,
} from '@geist-ui/core'
import { css } from 'linaria'
import { Edit2, Edit3, XCircle } from '@geist-ui/icons'

// TODO: Add default load items

const inputFieldClass = css`
  margin-block-start: -1rem;
`

const flexClass = css`
  display: flex;
  justify-content: space-between;
`

function Todo() {
  return (
    <Card width="100%">
      <div className={flexClass}>
        <Description title="Item #" content="Data about this section." />

        <Button icon={<XCircle />} auto scale={2 / 3} px={0.6}>
          Delete
        </Button>
      </div>
    </Card>
  )
}

type TodoListProps = {
  items: { id: number; text: string }[]
}

function TodoList({ items }: TodoListProps) {
  // we still need to handle the input field that will be added here

  //   trigger modal whenever we want to update the item

  return (
    <Grid.Container gap={1.5}>
      {items.map((item, index) => (
        <Grid xs={12} key={item.id}>
          <Card width="100%">
            <div className={flexClass}>
              <Description title={`Item ${++index}`} content={item.text} />

              <div>
                <Button icon={<Edit3 />} auto scale={2 / 3} px={0.6}>
                  Edit
                </Button>
                <Spacer w={0.2} inline />
                <Button icon={<XCircle />} auto scale={2 / 3} px={0.6}>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  )
}

export default function Todos() {
  // manage state from here
  const [items, setItems] = React.useState([
    {
      id: 1,
      text: 'Data about this section.',
    },
    {
      id: 2,
      text: 'Data about this section.',
    },
    {
      id: 3,
      text: 'Data about this section.',
    },
    {
      id: 4,
      text: 'Data about this section.',
    },
  ])

  const [inputValue, setInputValue] = React.useState('')

  const submitFormAction = () => {
    console.log(inputValue)
  }

  return (
    <>
      <Text h3>Input Section</Text>

      <Grid.Container gap={1.5}>
        <Grid xs={8} justify="center">
          <Input
            clearable
            placeholder="Enter some text here"
            width="100%"
            className={inputFieldClass}
            value={inputValue}
            onChange={ev => setInputValue(ev.target.value)}
          />
        </Grid>

        <Button
          scale={0.8}
          onClick={submitFormAction}
          disabled={!inputValue.length}
        >
          Action
        </Button>
      </Grid.Container>

      <Spacer h={3} />
      <Text h4>Items Section</Text>

      <TodoList items={items} />
    </>
  )
}
