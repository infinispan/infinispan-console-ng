import React, { useEffect, useState } from 'react';
import {
  FormGroup,
  FormSection,
  Grid,
  GridItem,
  HelperText,
  HelperTextItem,
  Radio,
  TextInput
} from '@patternfly/react-core';
import { useTranslation } from 'react-i18next';
import { CacheFeature, IsolationLevel } from '@services/infinispanRefData';
import { useCreateCache } from '@app/services/createCacheHook';
import { PopoverHelp } from '@app/Common/PopoverHelp';

const TransactionalConfigurationTuning = () => {
  const { t } = useTranslation();
  const { configuration, setConfiguration } = useCreateCache();
  const brandname = t('brandname.brandname');

  const [stopTimeout, setStopTimeout] = useState(configuration.advanced.transactionalAdvance?.stopTimeout);
  const [completeTimeout, setCompleteTimeout] = useState(configuration.advanced.transactionalAdvance?.completeTimeout);
  const [reaperInterval, setReaperInterval] = useState(configuration.advanced.transactionalAdvance?.reaperInterval);
  const [isolationLevel, setIsolationLevel] = useState<IsolationLevel | undefined>(
    configuration.advanced.transactionalAdvance?.isolationLevel as IsolationLevel
  );

  useEffect(() => {
    setConfiguration((prevState) => {
      return {
        ...prevState,
        advanced: {
          ...prevState.advanced,
          transactionalAdvance: {
            stopTimeout: stopTimeout,
            completeTimeout: completeTimeout,
            reaperInterval: reaperInterval,
            isolationLevel: isolationLevel
          }
        }
      };
    });
  }, [stopTimeout, completeTimeout, reaperInterval, isolationLevel]);

  if (!configuration.feature.cacheFeatureSelected.includes(CacheFeature.TRANSACTIONAL)) {
    return <div />;
  }

  return (
    <FormSection title={t('caches.create.configurations.advanced-options.transactional-tuning')}>
      <HelperText>
        <HelperTextItem>
          {t('caches.create.configurations.advanced-options.transactional-tuning-tooltip')}
        </HelperTextItem>
      </HelperText>
      <Grid md={4} hasGutter>
        <GridItem span={12}>
          <FormGroup
            isInline
            fieldId="field-isolation-level"
            label={t('caches.create.configurations.advanced-options.isolation-level-title')}
            labelIcon={
              <PopoverHelp
                name="field-isolation-level"
                label={t('caches.create.configurations.advanced-options.isolation-level-title')}
                content={t('caches.create.configurations.advanced-options.isolation-level-tooltip')}
              />
            }
          >
            <Radio
              name="radio-isolation-level"
              id="repeatable-read"
              onChange={() => setIsolationLevel(IsolationLevel.REPEATABLE_READ)}
              isChecked={(isolationLevel as IsolationLevel) == IsolationLevel.REPEATABLE_READ}
              label={
                <PopoverHelp
                  name={'full-xa'}
                  text={t('caches.create.configurations.advanced-options.isolation-level-repeatable-read')}
                  label={t('caches.create.configurations.advanced-options.isolation-level-repeatable-read')}
                  content={t('caches.create.configurations.advanced-options.isolation-level-repeatable-read-tooltip', {
                    brandname: brandname
                  })}
                />
              }
            />
            <Radio
              name="radio-isolation-level"
              id="read-committed"
              onChange={() => setIsolationLevel(IsolationLevel.READ_COMMITTED)}
              isChecked={(isolationLevel as IsolationLevel) == IsolationLevel.READ_COMMITTED}
              label={
                <PopoverHelp
                  name={'full-xa'}
                  text={t('caches.create.configurations.advanced-options.isolation-level-read-committed')}
                  label={t('caches.create.configurations.advanced-options.isolation-level-read-committed')}
                  content={t('caches.create.configurations.advanced-options.isolation-level-read-committed-tooltip', {
                    brandname: brandname
                  })}
                />
              }
            />
          </FormGroup>
        </GridItem>
        <GridItem span={4}>
          <FormGroup
            fieldId="stopTimeout"
            label={t('caches.create.configurations.advanced-options.stop-timeout')}
            labelIcon={
              <PopoverHelp
                name="stopTimeout"
                label={t('caches.create.configurations.advanced-options.stop-timeout')}
                content={t('caches.create.configurations.advanced-options.stop-timeout-tooltip', {
                  brandname: brandname
                })}
              />
            }
          >
            <TextInput
              data-cy="stopTimeout"
              placeholder="30000"
              value={stopTimeout}
              type="number"
              onChange={(val) => {
                isNaN(parseInt(val)) ? setStopTimeout(undefined!) : setStopTimeout(parseInt(val));
              }}
              aria-label="stop-timeout"
            />
          </FormGroup>
        </GridItem>
        <GridItem span={4}>
          <FormGroup
            fieldId="completeTimeout"
            label={t('caches.create.configurations.advanced-options.complete-timeout')}
            labelIcon={
              <PopoverHelp
                name="completeTimeout"
                label={t('caches.create.configurations.advanced-options.complete-timeout')}
                content={t('caches.create.configurations.advanced-options.complete-timeout-tooltip', {
                  brandname: brandname
                })}
              />
            }
          >
            <TextInput
              data-cy="completeTimeout"
              placeholder="60000"
              value={completeTimeout}
              type="number"
              onChange={(val) => {
                isNaN(parseInt(val)) ? setCompleteTimeout(undefined!) : setCompleteTimeout(parseInt(val));
              }}
              aria-label="complete-timeout"
            />
          </FormGroup>
        </GridItem>
        <GridItem span={4}>
          <FormGroup
            fieldId="reaperInterval"
            label={t('caches.create.configurations.advanced-options.reaper-interval')}
            labelIcon={
              <PopoverHelp
                name="reaperInterval"
                label={t('caches.create.configurations.advanced-options.reaper-interval')}
                content={t('caches.create.configurations.advanced-options.reaper-interval-tooltip', {
                  brandname: brandname
                })}
              />
            }
          >
            <TextInput
              data-cy="reaperInterval"
              placeholder="30000"
              value={reaperInterval}
              type="number"
              onChange={(val) => {
                isNaN(parseInt(val)) ? setReaperInterval(undefined!) : setReaperInterval(parseInt(val));
              }}
              aria-label="reaper-interval"
            />
          </FormGroup>
        </GridItem>
      </Grid>
    </FormSection>
  );
};

export default TransactionalConfigurationTuning;
