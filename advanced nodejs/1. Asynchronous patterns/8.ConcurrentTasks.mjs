import logUpdate from 'log-update'
const toX = () => "X"

const delay = seconds => new Promise(resolve => {
    setTimeout(resolve, seconds * 1000)
})

const tasks = [
    delay(4),
    delay(6),
    delay(3),
    delay(4),
    delay(10),
    delay(3),
    delay(5),
    delay(2),
]

class PromiseQueue {
    constructor(promises = [], concurrentCount = 1) {
        this.concurrentCount = concurrentCount;
        this.total = promises.length;
        this.todo = promises;
        this.running = [];
        this.completedTasks = []
    }
    // Checking we can run another task. Firstly we're checking running tasks should not be more than count, and are there remaining tasks.
    get runAnother() {
        return (this.running.length < this.concurrentCount) && this.todo.length;
    }

    // Just for Logging
    graphTasks() {
        const { todo, running, completedTasks } = this;
        logUpdate(`
            todo : [${todo.map(toX)}]
            running : [${running.map(toX)}]
            complete : [${completedTasks.map(toX)}]
        `)
    }

    run() {
        while (this.runAnother) {
            var promise = this.todo.shift() // Remove the promise from todo and set to promise
            // We're pushing the promise into running List & when it completes then pushing this to completed List
            promise.then(() => {
                this.completedTasks.push(this.running.shift())
                this.graphTasks()
                this.run()
            })
            this.running.push(promise)
            this.graphTasks()
        }
    }
}

const delayQueue = new PromiseQueue(tasks, 2) //No. of tasks to run at once
delayQueue.run()