const Strain = require('../models').Strain;
const Aroma = require('../models').Aroma;
const Flavor = require('../models').Flavor;
const Effect = require('../models').Effect;
const Condition = require('../models').Condition;

class helper {
  listAll(param, model, result, res, buttons) {
    const { fulfillment } = result;
    model.findAll()
    .then((effects) => {
      let allEffects;
      const messages = [fulfillment.messages[0]];
      if (effects.length > 0) {
        allEffects = effects.map(effect => (` ${effect.name}`));
        messages.push({
          type: 4,
          id: 'sdfs-3r34-sf42',
          platform: 'facebook',
          payload: {
            facebook: {
              text: `Here is a list of all ${param}s \n\n${allEffects}`
            }
          }
        });
        messages.push({
          type: 4,
          id: 'sdfs-3r34-sf43',
          platform: 'facebook',
          payload: {
            facebook: {
              text: `It's nice to see marijuana have so many positive ${param}s`
            }
          }
        });
        messages.push({
          type: 4,
          id: 'sdfs-3r34-sf44',
          platform: 'facebook',
          payload: {
            facebook: {
              attachment: {
                type: 'template',
                payload: {
                  template_type: 'button',
                  text: 'What do you want to do next? Please select an action below.',
                  buttons: [
                    {
                      type: 'postback',
                      payload: buttons[0].payload,
                      title: buttons[0].title
                    },
                    {
                      type: 'postback',
                      payload: buttons[1].payload,
                      title: buttons[1].title
                    }
                  ]
                }
              }
            }
          }
        });
      } else {
        allEffects = `No ${param} found!`;
      }
      return res.send(JSON.stringify({ messages }));
    });
  }

  getStrainsByParam(param, model, result, res) {
    const { parameters } = result;
    const page = parseInt(parameters.page, 10);
    const upper = page * 10;
    const lower = upper - 10;
    model.find({
      where: {
        name: parameters[param],
      },
      attributes: ['id', 'name'],
      include: [
        {
          model: Strain,
          attributes: ['id', 'name'],
          as: 'allstrains',
        },
      ]
    }).then((strains) => {
      const testing = strains.allstrains.slice(lower, upper);
      const messages = testing.map(strain => (
        {
          title: strain.name,
          subtitle: '\n',
          image_url: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/medical_marijuana_slideshow/getty_rm_photo_of_medical_marijuana_plant.jpg',
          buttons: [
            {
              title: `Get ${param}s`,
              type: 'postback',
              payload: `Get ${param}s for ${strain.name}`
            }
          ]
        }
      ));
      const output = {
        speech: 'Sit tight as I perform your request!',
        displayText: 'Sit tight as I perform your request!',
        data: {
          facebook: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'generic',
                elements: messages
              }
            }
          }
        },
        contextOut: [
          {
            name: 'next-page',
            parameters: {
              [param]: parameters[param],
              page: page + 1
            }
          }
        ],
        source: 'Mary'
      };
      return res.send(JSON.stringify(output));
    })
    .catch(err => res.send(err));
  }

  getParamByStrain(param, model, result, res, buttons) {
    const { parameters } = result;
    const name = parameters.strain;
    console.log(name);
    Strain.find({
      where: {
        name
      },
      attributes: ['id', 'name'],
      include: [
        {
          model,
          attributes: ['id', 'name'],
          as: `all${param}s`
        }
      ]
    }).then((strains) => {
      const allEffects = strains[`all${param}s`];
      const effectMap = allEffects.map(effect => ` ${effect.name}`);
      const messages = [];
      messages.push({
        type: 4,
        id: 'sdfs-3r34-sf49',
        platform: 'facebook',
        payload: {
          facebook: {
            text: `Here is a list of all ${param}s of ${name} \n\n${effectMap}`
          }
        }
      });
      messages.push({
        type: 4,
        id: 'sdfs-3r34-sf55',
        platform: 'facebook',
        payload: {
          facebook: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text: 'What do you want to do next? Please select an action below.',
                buttons: [
                  {
                    type: 'postback',
                    payload: buttons[0].payload,
                    title: buttons[0].title
                  },
                  {
                    type: 'postback',
                    payload: buttons[1].payload,
                    title: buttons[1].title
                  }
                ]
              }
            }
          }
        }
      });
      console.log(messages);
      return res.send(JSON.stringify({ messages }));
    })
    .catch((err) => {
      res.send({ err });
    });
  }

  getPictures(outputStrains, parameters, fulfillment, res) {
    const messages = [fulfillment.messages[0]];
    const output = outputStrains.map(strain => (
      {
        title: strain.name,
        subtitle: '\n',
        image_url: strain.strainExtraData.image,
        buttons: [
          {
            title: 'Learn Attributes',
            type: 'postback',
            payload: `Learn attributes of ${parameters.strain}`
          }
        ]
      }
    ));
    messages.push({
      type: 4,
      id: 'sdfs-3r34-sf4967',
      platform: 'facebook',
      payload: {
        facebook: {
          text: `Here is a list of strains matching ${parameters.strain}`
        }
      }
    });
    messages.push({
      type: 4,
      id: 'sdfs-3r34-sf4445',
      platform: 'facebook',
      payload: {
        facebook: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: output
            }
          }
        }
      }
    });
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
              text: 'Would you like to search again?',
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
    return res.send(JSON.stringify({ messages }));
  }

  getAttributes(Model, parameters, fulfillment, res) {
    const messages = [fulfillment.messages[0]];
    const name = parameters.strain;
    let outputText = `Here are the attributes of ${name} \n \n`;
    console.log('name', name);
    Strain.find({
      where: {
        name
      },
      attributes: ['id', 'name'],
      include: [
        {
          model: Condition,
          attributes: ['id', 'name'],
          as: 'allconditions'
        }
      ]
    })
    .then((conditions) => {
      if (conditions.allconditions.length > 0) {
        const conditionMap = conditions.allconditions.map(condition => ` ${condition.name}`);
        outputText += `Conditions: \n ${conditionMap} \n \n`;
      }
      Strain.find({
        where: {
          name
        },
        attributes: ['id', 'name'],
        include: [
          {
            model: Aroma,
            attributes: ['id', 'name'],
            as: 'allaromas'
          }
        ]
      })
      .then((aromas) => {
        if (aromas.allaromas.length > 0) {
          const aromaMap = aromas.allaromas.map(aroma => ` ${aroma.name}`);
          outputText += `Aromas: \n ${aromaMap} \n \n`;
        }
        Strain.find({
          where: {
            name
          },
          attributes: ['id', 'name'],
          include: [
            {
              model: Flavor,
              attributes: ['id', 'name'],
              as: 'allflavors'
            }
          ]
        })
        .then((flavors) => {
          if (flavors.allflavors.length > 0) {
            const flavorMap = flavors.allflavors.map(flavor => ` ${flavor.name}`);
            outputText += `Flavors: \n ${flavorMap} \n \n`;
          }
          Strain.find({
            where: {
              name
            },
            attributes: ['id', 'name'],
            include: [
              {
                model: Effect,
                attributes: ['id', 'name'],
                as: 'alleffects'
              }
            ]
          })
          .then((effects) => {
            if (effects.alleffects.length > 0) {
              const effectMap = effects.alleffects.map(effect => ` ${effect.name}`);
              outputText += `Effects: \n ${effectMap} \n`;
            }
            messages.push({
              type: 4,
              id: 'sdfs-3r34-sf49',
              platform: 'facebook',
              payload: {
                facebook: {
                  text: outputText
                }
              }
            });

            messages.push({
              type: 4,
              id: 'sdfs-3r34-sf49784',
              platform: 'facebook',
              payload: {
                facebook: {
                  text: 'Would you like to find out if this is your ideal strain?'
                }
              }
            });

            return res.send(JSON.stringify({ messages }));
          });
        });
      });
    });
  }
}

export default new helper();
