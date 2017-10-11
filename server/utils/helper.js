const Strain = require('../models').Strain;

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
}

export default new helper();
