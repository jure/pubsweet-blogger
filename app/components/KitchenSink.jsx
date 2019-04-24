import React, { useState } from 'react'
import {
  H1,
  Link,
  Icon,
  StateItem,
  TextArea,
  TextField,
  Steps,
  CenteredColumn,
  Section,
} from '@pubsweet/ui'

import { NoteEditor } from 'xpub-edit'

const HelloWorld = () => {
  const stateItemValues = ['To Clean', 'Cleaning', 'Cleaned']
  const [stateItemIndex, setIndex] = useState(0)

  const [textAreaValue, setTextAreaValue] = useState(
    'A text area you can write in...',
  )

  const [textFieldValue, setTextFieldValue] = useState(
    'And a text field to write in too!',
  )

  const [currentStep, setCurrentStep] = useState(0)

  return (
    <CenteredColumn>
      <H1>A little kitchen sink garden</H1>
      <Section>
        This is a small number of components available in PubSweet! For more go
        to <Link to="http://pubsweet.coko.foundation">our docs.</Link>
      </Section>

      <Section>
        <StateItem
          index={stateItemIndex}
          update={(_, nextIndex) => setIndex(nextIndex)}
          values={stateItemValues}
        />
      </Section>

      <Section>
        <TextArea
          label="Foo"
          onChange={event => setTextAreaValue(event.target.value)}
          placeholder="so you can write some in here"
          value={textAreaValue}
        />
      </Section>

      <Section>
        <TextField
          label="Foo"
          onChange={event => setTextFieldValue(event.target.value)}
          placeholder="so you can write some in here"
          value={textFieldValue}
        />
      </Section>

      <Section>
        <p>There are things like a step/wizard component:</p>
        <Steps currentStep={currentStep} margin="40px 50px">
          <Steps.Step title="First step" />
          <Steps.Step title="Second step" />
          <Steps.Step title="Third step" />
        </Steps>
        <button
          onClick={() => {
            if (currentStep > 0) {
              setCurrentStep(currentStep - 1)
            }
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            if (currentStep < 3) {
              setCurrentStep(currentStep + 1)
            }
          }}
        >
          Next
        </button>
      </Section>
      <Section>
        <p>Or icons... </p>
        <Icon size={6}>check_circle</Icon>
      </Section>
      <Section>
        <p>Or more complete editors, like this one</p>
        <NoteEditor
          onBlur={value => value}
          onChange={value => value}
          placeholder="Enter a message…"
          title="Note"
          value="I'm a more complete editor!"
        />
      </Section>
    </CenteredColumn>
  )
}

export default HelloWorld
