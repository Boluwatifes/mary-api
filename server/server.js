import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import xlsx from 'node-xlsx';
import helper from './utils/helper';

const Model = require('./models');
const Strain = require('./models').Strain;
const Effect = require('./models').Effect;
const Aroma = require('./models').Aroma;
const Flavor = require('./models').Flavor;
const Condition = require('./models').Condition;
const StrainProduct = require('./models').StrainProduct;
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
  } else if (action === 'all_aromas') {
    const buttons = [
      { payload: 'strains_by_aroma', title: 'Strains by aroma' },
      { payload: 'aromas_by_strain', title: 'Get strain aroma' }
    ];
    helper.listAll('aroma', Aroma, result, res, buttons);
  } else if (action === 'strains_by_aroma') {
    helper.getStrainsByParam('aroma', Aroma, result, res);
  } else if (action === 'aromas_by_strain') {
    const buttons = [
      { payload: 'strains_by_aroma', title: 'Strains by aroma' },
      { payload: 'aromas_by_strain', title: 'Get strain aroma' }
    ];
    helper.getParamByStrain('aroma', Aroma, result, res, buttons);
  } else if (action === 'marijuana_pictures') {
    StrainProduct.findAll({
      where: {
        name: {
          $like: `%${parameters.strain}%`
        }
      },
      attributes: ['name', 'strainExtraData'],
    })
    .then((strains) => {
      let outputStrains = [];
      if (strains.length <= 0) {
        const messages = [fulfillment.messages[0]];
        messages.push({
          type: 4,
          id: 'sdfs-3r34-sf44453',
          platform: 'facebook',
          payload: {
            facebook: {
              attachment: {
                type: 'template',
                payload: {
                  template_type: 'button',
                  text: `I'm sorry I dont have a picture of ${parameters.strain}. Do you want to search again?`,
                  buttons: [
                    {
                      type: 'postback',
                      payload: 'yes_search_again',
                      title: 'Yes'
                    },
                    {
                      type: 'postback',
                      payload: 'no_dont_search',
                      title: 'No'
                    }
                  ]
                }
              }
            }
          }
        });
      } else if (strains.length > 10) {
        outputStrains = strains.slice(0, 10);
        helper.getPictures(outputStrains, parameters, fulfillment, res);
      } else {
        outputStrains = strains;
        helper.getPictures(outputStrains, parameters, fulfillment, res);
      }
    });
  } else if (action === 'get_attributes') {
    helper.getAttributes(Model, parameters, fulfillment, res);
  } else {
    return res.send(JSON.stringify(fulfillment));
  }
});

// app.get('/api/v1/effects', (req, res) => {
//   const inputPath = path.join(__dirname, '../client/aroma.xlsx');
//   const workSheetsFromFile = xlsx.parse(inputPath);
//   const strains = workSheetsFromFile[3].data;
//   let count = 0;
//   Strain.findAndCountAll()
//   .then((strainss) => {
//     count = strainss.count;
//     strains.forEach((strain, i) => {
//       if (i > 0) {
//         Strain.find({
//           where: {
//             name: strain[0]
//           }
//         }).then((st) => {
//           if (!st) {
//             console.log('created');
//             Strain.create({
//               id: count + i,
//               name: strain[0]
//             });
//           } else {
//             console.log('Hes there');
//           }
//         })
//         .catch((err) => {
//           res.send({ err });
//         });
//       }
//     });
//   });
//   res.send('Created');
// });

// app.get('/api/v1/strains', (req, res) => {
//   const inputPath = path.join(__dirname, '../client/strainproducts.xlsx');
//   const workSheetsFromFile = xlsx.parse(inputPath);
//   const strains = workSheetsFromFile[0].data;
//   strains.forEach((strain, i) => {
//     if (i > 31001) {
//       StrainProduct.create({
//         id: strain[0],
//         ucpc: strain[1],
//         name: strain[2],
//         strainCategory: strain[3],
//         strainExtraData: JSON.parse(strain[4]),
//         strainLineageData: {}
//       });
//     }
//   });
//   res.send('Done!');
// });

app.get('/api/v1/flavor', (req, res) => {
  StrainProduct.findAll({
    where: {
      'strainExtraData.producer.name': 'Unknown Producer'
    },
    attributes: ['id', 'name'],
  }).then((flavors) => {
    res.send(flavors);
  });
});

// app.get('/api/v1/seed', (req, res) => {
//   const inputPath = path.join(__dirname, '../client/aroma.xlsx');
//   const workSheetsFromFile = xlsx.parse(inputPath);
//   const strains = workSheetsFromFile[55].data;
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
//           StrainAroma.create({
//             aromaId: 53,
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

app.get('/*', (req, res) => {
  res.send('Welcome to Mary\'s API');
});

app.listen(port, () => {
  console.log(`App started on ${port}`);
});
