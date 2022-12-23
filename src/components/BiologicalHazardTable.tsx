import { Button, Checkbox, NumberInput, Select, Table } from '@mantine/core'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTrashCan } from '@fortawesome/pro-regular-svg-icons'
import { faPlus } from '@fortawesome/pro-solid-svg-icons'
import '../styles/table.scss'
import {
  COLUMN_NAMES,
  DATA_SOURCE,
  INTERVAL_SELECT_OPTIONS,
  PROCESS_SELECT_OPTIONS,
  TDataSource,
} from '../utils/data'
import { Form, Formik } from 'formik'
import bioHazardValidation from '../utils/validation/formValidation'
import SuccessModal from './SuccessModal'
import { nanoid } from 'nanoid'

const BiologicalHazard: React.FC = () => {
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [dataSource, setDataSource] = useState<TDataSource[]>(() => DATA_SOURCE)

  const findRowByKey = (rowKey: string) => {
    const row = dataSource.find((data) => data.key === rowKey)
    if (row === undefined) throw new Error('Row not found')
    const rowIndex = parseInt(row.key, 10)
    return { row, rowIndex }
  }

  const handleDuplicateRow = (rowKey: string) => {
    const { row, rowIndex } = findRowByKey(rowKey)
    setDataSource((prevDataSource) => {
      const newDataSource = [...prevDataSource]
      newDataSource.splice(rowIndex + 1, 0, {
        ...row,
        key: nanoid(),
        action: true,
      })
      return newDataSource
    })
  }
  const handleDeleteRow = (rowKey: string) => {
    setDataSource((prevDataSource) =>
      prevDataSource.filter((data) => data.key !== rowKey),
    )
  }
  const handleUpdateDataSource = (
    rowId: string,
    updatePayload: Partial<TDataSource>,
  ) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((data) =>
        data.key === rowId ? { ...data, ...updatePayload } : data,
      ),
    )
  }
  return (
    <div className="table">
      <Table>
        <thead className="table-head">
          <tr>
            {COLUMN_NAMES.map((column, index) => (
              <th
                key={crypto.randomUUID()}
                className={`${
                  column === 'ANALYZE' ? 'sticky-component sticky-header' : ''
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((element, index) => (
            <Formik
              key={element.key}
              initialValues={{
                process: element.process,
                status: element['hazard addressed by supplier'],
                min_unit: element['min units'],
                max_unit: element['max units'],
                duration: element.duration,
                interval: element.interval,
              }}
              validationSchema={bioHazardValidation}
              onSubmit={(values) => {
                setSuccessModalOpen(true)
              }}
              enableReinitialize
            >
              {({
                errors,
                values,
                setFieldValue,
                handleSubmit,
                touched,
                getFieldProps,
                setFieldTouched,
              }) => {
                const isOfSameType = (key: keyof TDataSource) => {
                  return index > 0
                    ? dataSource[index - 1][key] === element[key]
                      ? ''
                      : element[key]
                    : element[key]
                }
                return (
                  <tr key={element.key}>
                    <td>{isOfSameType('ingredient name')}</td>
                    <td>{isOfSameType('category')}</td>
                    <td>{isOfSameType('sub category')}</td>
                    <td className="biological-hazard-title">
                      {element['biological hazard']}
                    </td>
                    <td>
                      <Checkbox
                        checked={values.status}
                        onChange={(value) => {
                          setFieldValue('status', value.target.checked)
                          handleUpdateDataSource(element.key, {
                            'hazard addressed by supplier':
                              value.target.checked,
                          })
                        }}
                        error={
                          touched.status && errors.status
                            ? errors.status.toString()
                            : ''
                        }
                      />
                    </td>
                    <td className="action-icons">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="icon add-icon"
                        onClick={() => handleDuplicateRow(element.key)}
                      />
                      {element.action === true ? (
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="icon remove-icon"
                          onClick={() => handleDeleteRow(element.key)}
                        />
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      <div className="process">
                        <div className="&__content">
                          Process{' '}
                          <span>
                            <FontAwesomeIcon
                              icon={faPlusSquare}
                              className="icon process-icon"
                            />{' '}
                          </span>
                        </div>

                        <Select
                          value={values.process}
                          onBlur={() => setFieldTouched('process')}
                          onChange={(value) => setFieldValue('process', value)}
                          placeholder="Select"
                          data={PROCESS_SELECT_OPTIONS}
                          error={
                            touched.process && errors.process
                              ? errors.process.toString()
                              : ''
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div className="units">
                        <NumberInput
                          placeholder=""
                          value={values.min_unit}
                          onChange={(value) => setFieldValue('min_unit', value)}
                          onBlur={() => setFieldTouched('min_unit')}
                          error={
                            touched.min_unit && errors.min_unit
                              ? errors.min_unit.toString()
                              : ''
                          }
                        />
                        <span>&#176;F</span>
                      </div>
                    </td>
                    <td>
                      <div className="units">
                        <NumberInput
                          placeholder=""
                          value={parseInt(values.max_unit)}
                          onBlur={() => setFieldTouched('max_unit')}
                          onChange={(value) =>
                            setFieldValue('max_unit', String(value))
                          }
                          error={
                            touched.max_unit && errors.max_unit
                              ? errors.max_unit.toString()
                              : ''
                          }
                        />

                        <span>&#176;F</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <NumberInput
                          placeholder=""
                          value={parseInt(values.duration)}
                          onBlur={() => setFieldTouched('duration')}
                          onChange={(value) => setFieldValue('duration', value)}
                          error={
                            touched.duration && errors.duration
                              ? errors.duration.toString()
                              : ''
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <Select
                          placeholder="Select"
                          data={INTERVAL_SELECT_OPTIONS}
                          value={values.interval}
                          onBlur={() => setFieldTouched('interval')}
                          onChange={(value) => setFieldValue('interval', value)}
                          error={
                            touched.interval && errors.interval
                              ? errors.interval.toString()
                              : ''
                          }
                        />
                      </div>
                    </td>
                    <td key={element.key} className="sticky-component">
                      <div className="button">
                        <Button onClick={() => handleSubmit()}>Analyze</Button>
                      </div>
                    </td>
                  </tr>
                )
              }}
            </Formik>
          ))}
        </tbody>
      </Table>
      <SuccessModal opened={successModalOpen} setOpened={setSuccessModalOpen} />
    </div>
  )
}

export default BiologicalHazard
