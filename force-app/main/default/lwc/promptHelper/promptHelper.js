import { LightningElement, api, track } from 'lwc';

const STEPS = [
    {
        title: "Now it's Your Turn!",
        subtitle: 'You Can Prompt the Agent With...',
        body: 'Try these questions.',
        questions: [
            'What are the standard operating procedures for rebalancing a client portfolio?',
            "I need a summary of our firm's risk limits.",
            'What is our framework for evaluating emerging markets?',
            "Can you summarize our firm's policy on data security and client communication?"
        ]
    },
    {
        title: "Now it's Your Turn!",
        subtitle: 'You Can Prompt the Agent With...',
        body: 'Try these questions.',
        questions: [
            'What is the current step-by-step approval workflow?',
            'What is the cadence for high net worth individuals?',
            'What are the mandatory Source of Wealth (SOW) verification steps I must follow?',
            'What are the specific KPI quadrants I am being graded on this year?'
        ]
    },
    {
        title: "Now it's Your Turn!",
        subtitle: 'You Can Prompt the Agent With...',
        body: 'Try these questions about your client Julie Morris.',
        questions: [
            'What should I know before my meeting with Julie Morris?',
            'What are some questions I can ask Julie during our meeting?',
            'What are her financial goals?',
            "Retrieve this account's activity timeline"
        ]
    },
    {
        title: "Now it's Your Turn!",
        subtitle: 'You Can Prompt the Agent With...',
        body: 'Try these questions.',
        questions: ['Draft an email to Julie Morris offering a discount']
    }
];

export default class PromptHelper extends LightningElement {
    @api currentStep = 0;
    @api clientName;
    @api totalSteps;

    @track showToast = false;
    @track animationToken = 0;

    get effectiveTotalSteps() {
        return STEPS.length;
    }

    get displayTotalSteps() {
        return this.effectiveTotalSteps;
    }

    get stepDisplay() {
        return this.currentStep + 1;
    }

    get currentStepData() {
        return STEPS[this.currentStep];
    }

    get currentTitle() {
        return this.currentStepData.title;
    }

    get currentSubtitle() {
        return this.currentStepData.subtitle;
    }

    get currentBody() {
        return this.currentStepData.body;
    }

    get currentQuestions() {
        return this.currentStepData.questions;
    }

    get isFirstStep() {
        return this.currentStep === 0;
    }

    get isLastStep() {
        return this.currentStep === this.effectiveTotalSteps - 1;
    }

    get gridClass() {
        return this.currentQuestions.length === 1
            ? 'suggestions-grid single-column'
            : 'suggestions-grid';
    }

    get cardContentClass() {
        return `card-content fade-${this.animationToken % 2}`;
    }

    get dots() {
        const result = [];
        for (let i = 0; i < this.effectiveTotalSteps; i++) {
            result.push({
                key: `dot-${i}`,
                class: i === this.currentStep ? 'dot dot-active' : 'dot'
            });
        }
        return result;
    }

    handleSuggestionClick(event) {
        const text = event.currentTarget.dataset.text;
        this.copyToClipboard(text);
    }

    copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(
                () => this.flashToast(),
                () => this.fallbackCopy(text)
            );
        } else {
            this.fallbackCopy(text);
        }
    }

    fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            this.flashToast();
        } catch (e) {
            // no-op
        }
        document.body.removeChild(textarea);
    }

    flashToast() {
        this.showToast = true;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            this.showToast = false;
        }, 1500);
    }

    handleNext() {
        if (this.isLastStep) return;
        this.currentStep += 1;
        this.animationToken += 1;
        this.dispatchEvent(new CustomEvent('next', { detail: { step: this.currentStep } }));
    }

    handlePrevious() {
        if (this.isFirstStep) return;
        this.currentStep -= 1;
        this.animationToken += 1;
        this.dispatchEvent(new CustomEvent('previous', { detail: { step: this.currentStep } }));
    }
}
