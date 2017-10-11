import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import xlsx from 'node-xlsx';
import helper from './utils/helper';

const Strain = require('./models').Strain;
const Effect = require('./models').Effect;
const Aroma = require('./models').Aroma;
const Flavor = require('./models').Flavor;
const Condition = require('./models').Condition;
const StrainEffect = require('./models').StrainEffect;
const StrainFlavor = require('./models').StrainFlavor;
const StrainAroma = require('./models').StrainAroma;
const StrainCondition = require('./models').StrainCondition;
const Sequelize = require('./models').Sequelize;

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/v1/webhook/effects', (req, res) => {
  res.status(200).send({
    message: 'Welcome'
  });
});

app.post('/api/v1/webhook', (req, res) => {
  console.log(req.body.result.contexts);
  const { result } = req.body;
  const { action, fulfillment, parameters } = result;
  if (action === 'all-effects') {
    const buttons = [
      { payload: 'get_strains_by_effect', title: 'Get strains by effect' },
      { payload: 'get_a_strain_effects', title: 'Get a strain\'s effect' }
    ];
    helper.listAll('effect', Effect, result, res, buttons);
  } else if (action === 'list-strains-by-effect') {
    helper.getStrainsByParam('effect', Effect, result, res);
  } else if (action === 'get_effects_for_strain') {
    const buttons = [
      { payload: 'get_strains_by_effect', title: 'Get strains by effect' },
      { payload: 'get_a_strain_effects', title: 'Get a strain\'s effect' }
    ];
    helper.getParamByStrain('effect', Effect, result, res, buttons);
  } else if (action === 'all_marijuana_flavors') {
    const buttons = [
      { payload: 'strains_by_flavor', title: 'Get strains by flavor' },
      { payload: 'flavors_by_strain', title: 'Get strain flavors' }
    ];
    helper.listAll('flavor', Flavor, result, res, buttons);
  } else if (action === 'strains_by_flavor') {
    helper.getStrainsByParam('flavor', Flavor, result, res);
  } else if (action === 'flavors_by_strain') {
    const buttons = [
      { payload: 'strains_by_flavor', title: 'Get strains by flavor' },
      { payload: 'flavors_by_strain', title: 'Get strain flavors' }
    ];
    helper.getParamByStrain('flavor', Flavor, result, res, buttons);
  } else if (action === 'all_conditions') {
    const buttons = [
      { payload: 'strains_by_condition', title: 'Strains by condition' },
      { payload: 'conditions_by_strain', title: 'Get strain condition' }
    ];
    helper.listAll('condition', Condition, result, res, buttons);
  } else if (action === 'strains_by_condition') {
    helper.getStrainsByParam('condition', Condition, result, res);
  } else if (action === 'conditions_by_strain') {
    const buttons = [
      { payload: 'strains_by_condition', title: 'Strains by condition' },
      { payload: 'conditions_by_strain', title: 'Get strain condition' }
    ];
    helper.getParamByStrain('condition', Condition, result, res, buttons);
  } else {
    return res.send(JSON.stringify(fulfillment));
  }
});


app.get('/*', (req, res) => {
  res.send('Welcome to Mary\'s API');
});
// app.get('/api/v1/effects', (req, res) => {
//   const inputPath = path.join(__dirname, '../client/aroma.xlsx');
//   const workSheetsFromFile = xlsx.parse(inputPath);
//   const strains = workSheetsFromFile[0].data;
//   strains.forEach((strain, i) => {
//     Strain.find({
//       where: {
//         name: strain[0]
//       }
//     }).then((st) => {
//       if (!st) {
//         Strain.create({
//           id: 3955 + i,
//           name: strain[0]
//         });
//       } else {
//         console.log('Hes there');
//       }
//     })
//     .catch((err) => {
//       res.send({ err });
//     });
//   });
//   res.send('Created');
// });

// app.get('/api/v1/strains', (req, res) => {
//   const inputPath = path.join(__dirname, '../client/condition.xlsx');
//   const workSheetsFromFile = xlsx.parse(inputPath);
//   const strains = workSheetsFromFile[1].data.reverse();
//   strains.forEach((strain, i) => {
//     if (i < 42) {
//       Condition.create({
//         name: strain[0]
//       });
//     }
//   });
//   Condition.findAll()
//   .then((aromas) => {
//     res.send(aromas);
//   });
// });

// app.get('/api/v1/flavor', (req, res) => {
//   Flavor.find({
//     where: {
//       name: 'mango'
//     },
//     attributes: ['id', 'name'],
//     include: [
//       {
//         model: Strain,
//         attributes: ['id', 'name'],
//         as: 'allstrains',
//       },
//     ]
//   }).then((flavors) => {
//     res.send(flavors);
//   });
// });

// app.get('/api/v1/seed', (req, res) => {
//   const inputPath = path.join(__dirname, '../client/condition.xlsx');
//   const workSheetsFromFile = xlsx.parse(inputPath);
//   const strains = workSheetsFromFile[44].data;
//   strains.forEach((strain, i) => {
//     if (i > 0) {
//       Strain.findOne({
//         where: {
//           name: strain[0]
//         },
//         attributes: ['id']
//       })
//       .then((st) => {
//         if (st) {
//           const id = st.id;
//           StrainCondition.create({
//             conditionId: 42,
//             strainId: id
//           });
//         } else {
//           console.log('No way');
//         }
//       });
//       // console.log(strain[0]);
//     }
//   });
//   res.status(200).send({
//     message: 'Strains created successfully!'
//   });
// });

app.listen(port, () => {
  console.log(`App started on ${port}`);
});
