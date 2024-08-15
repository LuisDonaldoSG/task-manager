import TaskList from '@components/task/TaskList'
import { TaskI } from '@interfaces/task'
import { render, screen } from '@testing-library/react'
import dayjs from 'dayjs'

jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
        isFallback: false,
    }),
}));

const tasks: TaskI[] = [
    {
        title: "Buy groceries",
        description: "Purchase milk, eggs, and bread from the store",
        priority: "low",
        completed: false,
        dateTime: dayjs("2024-08-15T03:35:20.524Z"),
        id: "tJpdrfmDw0LSu9Lm_VTfm"
    },
    {
        title: "Finish report",
        description: "Complete the quarterly financial report",
        priority: "medium",
        completed: true,
        dateTime: dayjs("2024-08-15T04:27:55.603Z"),
        id: "Zznmrfd6NKsIJnzo0KTJW"
    },
    {
        title: "Doctor appointment",
        description: "Visit Dr. Smith for annual check-up",
        priority: "high",
        completed: false,
        dateTime: dayjs("2024-08-15T04:28:05.775Z"),
        id: "0VsHeLsaI5X_LNka1nH6C"
    },
    {
        title: "Team meeting",
        description: "Discuss project updates with the team",
        priority: "medium",
        completed: false,
        dateTime: dayjs("2024-08-15T04:42:50.247Z"),
        id: "bfJh38C1pAelhIOquEcjT"
    }
]

it('should render first list title', () => {
    render(<TaskList tasks={tasks} />)
    expect(screen.getByText('Buy groceries')).toBeInTheDocument()
})
it('should render second list title', () => {
    render(<TaskList tasks={tasks} />)
    expect(screen.getByText('Finish report')).toBeInTheDocument()
})
it('should render third list title', () => {
    render(<TaskList tasks={tasks} />)
    expect(screen.getByText('Doctor appointment')).toBeInTheDocument()
})
it('should render fourth list title', () => {
    render(<TaskList tasks={tasks} />)
    expect(screen.getByText('Team meeting')).toBeInTheDocument()
})
it('should format the first dataTime correctly', () => {
    render(<TaskList tasks={tasks} />)
    expect(screen.getByText(tasks[0].dateTime.format('DD/MM/YYYY - hh:mm a'))).toBeInTheDocument()
})