import { DateTimeInput } from 'components/DateTimeInput';
import { TFunction } from 'react-i18next';
import styles from 'modules/TimestampPicker.module.scss';
import React, { ChangeEventHandler, FC, useCallback, useMemo } from 'react';
import Select from 'react-select';
import { StylesConfig } from 'react-select/src/styles';
import { ThemeConfig } from 'react-select/src/theme';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import { getTimezoneValue } from 'src/util/timezone';

const dateTimeInputId = 'date-time-input';
const timezoneSelectId = 'timezone-input';

interface TimezoneOptionType {
  label: string;
  value: string;
}

const customTheme: ThemeConfig = (theme) => ({
  ...theme,
  spacing: {
    ...theme.spacing,
    controlHeight: 48,
  },
  colors: {
    primary: 'hsl(211,100%,57%)',
    primary75: 'hsl(211,100%,65%)',
    primary50: 'hsl(211,100%,85%)',
    primary25: 'hsl(211,100%,94%)',

    danger: '#de350b',
    dangerLight: '#ffbdad',

    neutral90: 'hsl(0, 0%, 100%)',
    neutral80: 'hsl(0, 0%, 95%)',
    neutral70: 'hsl(0, 0%, 90%)',
    neutral60: 'hsl(0, 0%, 80%)',
    neutral50: 'hsl(0, 0%, 70%)',
    neutral40: 'hsl(0, 0%, 60%)',
    neutral30: 'hsl(0, 0%, 50%)',
    neutral20: 'hsl(0, 0%, 40%)',
    neutral10: 'hsl(0, 0%, 30%)',
    neutral5: 'hsl(0, 0%, 20%)',
    neutral0: 'hsl(0, 0%, 10%)',
  },
});

const customStyles: StylesConfig<TimezoneOptionType, false> = {
  option(base, props) {
    return {
      ...base,
      color: props.isSelected ? '#fff' : base.color,
      backgroundColor: props.isFocused ? (props.isSelected ? '#717cf4' : '#2f3136') : props.isSelected ? '#5865f2' : 'transparent',
    };
  },
  control(base, props) {
    const boxShadowColor = 'rgba(0,123,255,0.25)';
    return {
      ...base,
      borderWidth: '1px',
      borderColor: props.isFocused ? '#80bdff' : '#202225',
      boxShadow: props.isFocused ? `0 0 0 0.2rem ${boxShadowColor}` : '0',
      backgroundColor: '#2f3136',
    };
  },
};

interface PropTypes {
  changeTimezone: (tz: null | string) => void;
  dateTimeString: string;
  fixedTimestamp: boolean;
  handleDateTimeChange: (value: string | null) => void;
  t: TFunction;
  timezone: string;
  timezoneNames: TimezoneOptionType[];
}

export const TimestampPicker: FC<PropTypes> = ({
  changeTimezone,
  dateTimeString,
  fixedTimestamp,
  handleDateTimeChange: onDateTimeChange,
  t,
  timezone,
  timezoneNames,
  children,
}) => {
  const handleTimezoneChange = useCallback(
    (selected: TimezoneOptionType | null) => {
      changeTimezone(selected ? selected.value : null);
    },
    [changeTimezone],
  );

  const timezoneSelectValue = useMemo(() => getTimezoneValue(timezone), [timezone]);

  const handleDateTimeChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onDateTimeChange(e.target.value);
    },
    [onDateTimeChange],
  );

  return (
    <div className={styles.datepicker}>
      <Row>
        <Col md>
          <FormGroup>
            <Label className={styles.formLabel}>{t('common:input.date')}</Label>

            <DateTimeInput
              value={dateTimeString}
              className="mb-2 mb-xl-0"
              id={dateTimeInputId}
              icon="calendar"
              onChange={handleDateTimeChange}
              readOnly={fixedTimestamp}
            />
          </FormGroup>
        </Col>
        <Col md={5}>
          <FormGroup>
            <Label className={styles.formLabel} for={timezoneSelectId}>
              {t('common:input.timezone')}
            </Label>
            <Select
              inputId={timezoneSelectId}
              value={timezoneSelectValue}
              options={timezoneNames}
              onChange={handleTimezoneChange}
              className="w-100"
              theme={customTheme}
              styles={customStyles}
              isClearable
              isDisabled={fixedTimestamp}
            />
            <div className="d-block d-xl-none mt-2">{children}</div>
          </FormGroup>
        </Col>
        <Col xs="auto" className="d-none d-xl-flex flex-row align-items-end">
          {children}
        </Col>
      </Row>
    </div>
  );
};
