import inquirer from 'inquirer';
import JobSpec from './nomad-job-spec.json';
import TaskGroupSpec from './nomad-taskgroup-spec.json';
import TaskSpec from './nomad-task-spec.json';

const likesFood = (aFood) => {
  return function (answers) {
    return answers[aFood];
  };
};

const questions = [
  /* region */
  {
    type: 'list',
    message: 'Select region',
    name: 'Region',
    choices: [
      new inquirer.Separator(' = Europe = '),
      {name: 'Norway'},
      {name: 'Sweden'},
      {name: 'France'},
      {name: 'Spain'},
      new inquirer.Separator(' = USA = '),
      {name: 'New York City'},
      {name: 'Los Angeles'},
      {name: 'Chicago'},
      {name: 'Houston'},
      new inquirer.Separator(' = ASIA ='),
      {name: 'South Korea'},
      {name: 'Japan'},
      {name: 'India'},
      {name: 'Turkey'},
      {name: 'Taiwan'},
      new inquirer.Separator(' = China = '),
      {name: 'Shanghai'},
      {name: 'Beijing'},
      {name: 'Shandong'},
      {name: 'Shaanxi'},
      {name: 'Hong Kong'}
    ],
    validate: answer => {
      if (answer.length < 1) {
        return 'You must choose at least one topping.';
      }
      return true;
    }
  },

  /* Job Id */
  {
    type: 'input',
    name: 'ID',
    message: 'Job Unique ID?',
    validate: value => {
      if (value) {
        return true;
      }

      return 'Required (e.g: application-name)';
    }
  },

  /* Job Name */
  {
    type: 'input',
    name: 'Name',
    message: 'Job Name?',
    validate: value => {
      if (value) {
        return true;
      }

      return 'Required (e.g: application-name)';
    }
  },

  /* Job Type */
  {
    type: 'list',
    name: 'Type',
    message: 'Specifies the job type and switches which scheduler is used',
    choices: ['service', 'system', 'batch'],
    filter: function (val) {
      return val.toLowerCase();
    }
  },

  /* Priority */
  {
    type: 'input',
    name: 'Priority',
    message: 'Specifies the job priority which is used to prioritize scheduling and access to resources.\nMust be between 1 and 100 inclusively, with a larger value corresponding to a higher priority',
    default: function () {
      return 50;
    }
  },

  /* Data Center */
  {
    type: 'checkbox',
    message: 'Select Data Cnter',
    name: 'Datacenters',
    choices: [
      {name: 'sandbox'},
      {name: 'eu-01'},
      {name: 'eu-02'},
      {name: 'usa-01'},
      {name: 'zn-01'},
      {name: 'zn-02'},
      {name: 'zn-03'},
      {name: 'kor-01'},
      {name: 'kor-02'}
    ],
    validate: answer => {
      if (answer.length < 1) {
        return 'You must choose at least one datacenter.';
      }
      return true;
    }
  },
];

const newTask = answer => {
}



inquirer.prompt(questions)
  .then(answer => {
    let res = Object.assign({}, JobSpec, answer);

    inquirer.prompt([
      {
        type: 'input',
        name: 'Name',
        message: 'TaskGroup Name?'
      },
      {
        type: 'input',
        name: 'Count',
        message: 'Instance Count',
        default: 1
      }
    ])
      .then(answer => {
        let task = Object.assign({}, TaskGroupSpec, answer);
        res['TaskGroups'] = answer;
        console.log(res);
      });
  });
