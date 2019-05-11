import * as React from 'react'
import { mount, shallow } from 'enzyme'
import Table, { Props, ColumnDescription } from './Table'

const EXAMPLE_DATA = [
  {
    id: 1,
    name: 'Verla Bashirian',
    dayOfArrival: '1/2/18'
  },
  {
    id: 2,
    name: 'Daniella Mante',
    dayOfArrival: '2/16/17'
  },
  {
    id: 3,
    name: 'Estrella Feil',
    dayOfArrival: '5/12/18'
  },
  {
    id: 4,
    name: 'Hilbert McKenzie',
    dayOfArrival: '12/22/19'
  },
  {
    id: 5,
    name: 'Myah Kerluke',
    dayOfArrival: '9/7/15'
  }
]

type ExampleRowType = {
  id: number
  name: string
  dayOfArrival: string
}

const COLUMN_DESCRIPTIONS: Array<ColumnDescription<ExampleRowType, {}>> = [
  {
    key: 'dayOfArrival',
    format: (row: ExampleRowType): string => row.dayOfArrival.replace('/', ' ')
  },
  {
    key: 'name',
    title: 'Applicant Name'
  }
]

describe('Table', () => {
  describe('Without column descriptions', () => {
    function sampleComponent() {
      const props: Props<ExampleRowType, {}> = {
        data: EXAMPLE_DATA,
        columns: undefined
      }

      return <Table {...props} />
    }

    it('should match the snapshot', () => {
      const component = shallow(sampleComponent())
      expect(component).toMatchSnapshot()
    })
  })

  describe('With column descriptions', () => {
    function sampleComponent() {
      const props: Props<ExampleRowType, {}> = {
        data: EXAMPLE_DATA,
        columns: COLUMN_DESCRIPTIONS
      }

      return <Table {...props} />
    }

    it('should match the snapshot', () => {
      const component = shallow(sampleComponent())
      expect(component).toMatchSnapshot()
    })
  })

  describe('With an extra column', () => {
    function sampleComponent(
      mockedButtonCallback: Function = jest.fn()
    ) {
      const COLUMNS: Array<ColumnDescription<ExampleRowType, { action_delete: null }>> = [
        ...COLUMN_DESCRIPTIONS,
        {
          key: 'action_delete',
          title: 'Delete',
          format: (row: ExampleRowType): React.ReactNode => {
            return <button onClick={() => mockedButtonCallback(row.id)}>Delete</button>
          }
        }
      ]

      const props: Props<ExampleRowType, { action_delete: null }> = {
        data: EXAMPLE_DATA,
        columns: COLUMNS
      }

      return <Table {...props} />
    }

    it('should match the snapshot', () => {
      const component = shallow(sampleComponent())
      expect(component).toMatchSnapshot()
    })

    it('render a usable CTA', () => {
      const mockedButtonCallback = jest.fn()
      const component = mount(sampleComponent(mockedButtonCallback))

      const button = component
        .find('button')
        .find({ children: 'Delete' })
        .first()
      button.simulate('click')

      expect(mockedButtonCallback.mock.calls).toHaveLength(1)
    })
  })
})
