import React from 'react'
import { AddTodoItemForm, BrandHeader, Footer, InstructionGuideSection, TodoItemLists } from './components'

function App() {
    return (
        <div className="app">
            <BrandHeader />
            <article>
                <InstructionGuideSection />
            </article>
            <main>
                <AddTodoItemForm />
                <TodoItemLists />
            </main>
            <Footer />
        </div>
    )
}

export default App
