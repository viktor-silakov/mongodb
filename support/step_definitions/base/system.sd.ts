import { ChildProcess, exec } from 'child_process';
import { When } from '@fixtures';

interface ExecCommandOptions {
    wait?: boolean;
    pauseAfterExecution?: number;
    silent?: boolean;
}

import { spawn } from 'child_process';

async function execCommand(command: string, options: ExecCommandOptions = {}): Promise<ChildProcess | { stdout: string, stderr: string }> {
    const {
        wait = true,
        pauseAfterExecution = 500,
        silent = false,
    } = options;

    if (typeof command !== 'string') {
        throw new TypeError('Command must be a string');
    }

    return new Promise<{ stdout: string, stderr: string }>((resolve, reject) => {
        const childProcess = spawn(command, { shell: true });

        let stdout = '';
        let stderr = '';

        childProcess.stdout.on('data', (data) => {
            const text = data.toString();
            stdout += text;
            if (!silent) {
                console.log(`Stdout: ${text}`);
            }
        });

        childProcess.stderr.on('data', (data) => {
            const text = data.toString();
            stderr += text;
            if (!silent) {
                console.error(`Stderr: ${text}`);
            }
        });

        childProcess.on('error', (error) => {
            if (!silent) console.error(`Execution error: ${error}`);
            reject(error);
        });

        childProcess.on('close', (code) => {
            if (wait) {
                resolve({ stdout, stderr });
            }
        });

        if (!wait) {
            setTimeout(() => {
                resolve(childProcess);
            }, pauseAfterExecution);
        }
    });
}
When(
    /^I execute command:$/,
    async function ({ testData }, command: string) {
        try {
            const { stdout, stderr } = await execCommand(command);
            if (stderr) console.error('Error during execute command:', stderr)
            console.log('👉 Command output:', stdout);
            if (typeof stdout === 'string') testData.set('command output', stdout.trim());

        } catch (error) {
            console.error('Failed to execute command:', error,);
            throw error;
        }
    }
);

When(
    /^I execute detached command:$/,
    async function ({ testData }, command: string) {
        try {
            const process = await execCommand(command, { wait: false });

        } catch (error) {
            console.error('Failed to execute command:', error,);
            throw error;
        }
    }
);

