import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik, FieldArray } from "formik";
import * as Yup from "yup";

import FileUpload from "../../Components/FileUpload";
import TextInput from "../../Components/TextInput";
import Calendar from "../../Components/Calendar";

import { genders_options } from "../../Data/Gender";
import { industry_options } from "../../Data/Industry";
import { certificate_options } from "../../Data/Certificate";
import Dropdown from "../../Components/Dropdown";
import Button from "../../Components/Button";
import ProfileView from "../ProfileView";

function ProfileEdit() {
  const { t: translate } = useTranslation();

  const ProflieSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, translate("profile_edit_panel.first_name.error_message.short"))
      .max(50, translate("profile_edit_panel.first_name.error_message.long"))
      .required(
        translate("profile_edit_panel.first_name.error_message.required")
      ),
    middleName: Yup.string()
      .min(2, translate("profile_edit_panel.middle_name.error_message.short"))
      .max(50, translate("profile_edit_panel.middle_name.error_message.long"))
      .required(
        translate("profile_edit_panel.middle_name.error_message.required")
      ),
    lastName: Yup.string()
      .min(2, translate("profile_edit_panel.last_name.error_message.short"))
      .max(50, translate("profile_edit_panel.last_name.error_message.long"))
      .required(
        translate("profile_edit_panel.last_name.error_message.required")
      ),
    birthDay: Yup.date(
      translate("profile_edit_panel.birth_day.error_message.invalid")
    )
      .required(
        translate("profile_edit_panel.birth_day.error_message.required")
      )
      .default(() => new Date()),
    gender: Yup.string()
      .oneOf(
        genders_options,
        translate("profile_edit_panel.gender.error_message.invalid")
      )
      .required(translate("profile_edit_panel.gender.error_message.required")),
    mobileNumber: Yup.string()
      .matches(
        /^[0-9]{9}$/,
        translate("profile_edit_panel.mobile_number.error_message.invalid")
      )
      .required(
        translate("profile_edit_panel.mobile_number.error_message.required")
      ),
    email: Yup.string()
      .email(translate("profile_edit_panel.email.error_message.invalid"))
      .required(translate("profile_edit_panel.email.error_message.required")),
    address: Yup.string()
      .min(2, translate("profile_edit_panel.address.error_message.short"))
      .max(50, translate("profile_edit_panel.address.error_message.long"))
      .required(translate("profile_edit_panel.address.error_message.required")),
    industry: Yup.string()
      .oneOf(
        industry_options,
        translate("profile_edit_panel.industry.error_message.invalid")
      )
      .required(
        translate("profile_edit_panel.industry.error_message.required")
      ),
    experiences: Yup.array().of(
      Yup.object().shape({
        organization: Yup.string()
          .min(
            2,
            translate(
              "profile_edit_panel.work_experience.organization_name.error_message.short"
            )
          )
          .max(
            50,
            translate(
              "profile_edit_panel.work_experience.organization_name.error_message.long"
            )
          )
          .required(
            translate(
              "profile_edit_panel.work_experience.organization_name.error_message.required"
            )
          ),
        position: Yup.string()
          .min(
            2,
            translate(
              "profile_edit_panel.work_experience.position.error_message.short"
            )
          )
          .max(
            50,
            translate(
              "profile_edit_panel.work_experience.position.error_message.long"
            )
          )
          .required(
            translate(
              "profile_edit_panel.work_experience.position.error_message.required"
            )
          ),
        from: Yup.date(
          translate(
            "profile_edit_panel.work_experience.from_date.error_message.invalid"
          )
        ),
        to: Yup.date(
          translate(
            "profile_edit_panel.work_experience.to_date.error_message.invalid"
          )
        ),
      })
    ),
    academicQualifications: Yup.array().of(
      Yup.object().shape({
        institute: Yup.string()
          .min(
            2,
            translate(
              "profile_edit_panel.academic_qualification.institute_name.error_message.short"
            )
          )
          .max(
            50,
            translate(
              "profile_edit_panel.academic_qualification.institute_name.error_message.long"
            )
          )
          .required(
            translate(
              "profile_edit_panel.academic_qualification.institute_name.error_message.required"
            )
          ),
        certificate: Yup.string()
          .min(
            2,
            translate(
              "profile_edit_panel.academic_qualification.certificate_name.error_message.short"
            )
          )
          .max(
            50,
            translate(
              "profile_edit_panel.academic_qualification.certificate_name.error_message.long"
            )
          )
          .required(
            translate(
              "profile_edit_panel.academic_qualification.certificate_name.error_message.required"
            )
          ),
        certificateType: Yup.string()
          .oneOf(
            certificate_options,
            translate(
              "profile_edit_panel.academic_qualification.certificate_type.error_message.invalid"
            )
          )
          .required(
            translate(
              "profile_edit_panel.academic_qualification.certificate_type.error_message.required"
            )
          ),
        from: Yup.date(
          translate(
            "profile_edit_panel.academic_qualification.from_date.error_message.invalid"
          )
        ),
        to: Yup.date(
          translate(
            "profile_edit_panel.academic_qualification.to_date.error_message.invalid"
          )
        ),
      })
    ),
    professionalQualifications: Yup.array().of(
      Yup.object().shape({
        institute: Yup.string()
          .min(
            2,
            translate(
              "profile_edit_panel.professional_qualification.institute_name.error_message.short"
            )
          )
          .max(
            50,
            translate(
              "profile_edit_panel.professional_qualification.institute_name.error_message.long"
            )
          )
          .required(
            translate(
              "profile_edit_panel.professional_qualification.institute_name.error_message.required"
            )
          ),
        certificate: Yup.string()
          .min(
            2,
            translate(
              "profile_edit_panel.professional_qualification.certificate_name.error_message.short"
            )
          )
          .max(
            50,
            translate(
              "profile_edit_panel.professional_qualification.certificate_name.error_message.long"
            )
          )
          .required(
            translate(
              "profile_edit_panel.professional_qualification.certificate_name.error_message.required"
            )
          ),
        certificateType: Yup.string()
          .oneOf(
            certificate_options,
            translate(
              "profile_edit_panel.professional_qualification.certificate_type.error_message.invalid"
            )
          )
          .required(
            translate(
              "profile_edit_panel.professional_qualification.certificate_type.error_message.required"
            )
          ),
        from: Yup.date(
          translate(
            "profile_edit_panel.professional_qualification.from_date.error_message.invalid"
          )
        ),
        to: Yup.date(
          translate(
            "profile_edit_panel.professional_qualification.to_date.error_message.invalid"
          )
        ),
      })
    ),
  });

  const [visible, setVisible] = useState(false);

  const show = () => {
    console.log(JSON.stringify(formik.values));
  };

  const onAddExperience = () => {
    const newExperiences = [...formik.values.experiences];
    newExperiences.push({
      organization: "",
      position: "",
      from: new Date(),
      to: new Date(),
    });
    formik.setFieldValue("experiences", newExperiences);
  };

  const onRemoveExperience = (index) => {
    const newExperiences = [...formik.values.experiences];
    newExperiences.splice(index, 1);
    formik.setFieldValue("experiences", newExperiences);
  };

  const onAddAcademicQualification = () => {
    const newAcademicQualifications = [...formik.values.academicQualifications];
    newAcademicQualifications.push({
      institute: "",
      certificate: "",
      certificateType: "",
      from: new Date(),
      to: new Date(),
    });
    formik.setFieldValue("academicQualifications", newAcademicQualifications);
  };

  const onRemoveAcademicQualification = (index) => {
    const newAcademicQualifications = [...formik.values.academicQualifications];
    newAcademicQualifications.splice(index, 1);
    formik.setFieldValue("academicQualifications", newAcademicQualifications);
  };

  const onAddProfessionalQualification = () => {
    const newProfessionalQualifications = [
      ...formik.values.professionalQualifications,
    ];
    newProfessionalQualifications.push({
      institute: "",
      certificate: "",
      certificateType: "",
      from: new Date(),
      to: new Date(),
    });
    formik.setFieldValue(
      "professionalQualifications",
      newProfessionalQualifications
    );
  };

  const onRemoveProfessionalQualification = (index) => {
    const newProfessionalQualifications = [
      ...formik.values.professionalQualifications,
    ];
    newProfessionalQualifications.splice(index, 1);
    formik.setFieldValue(
      "professionalQualifications",
      newProfessionalQualifications
    );
  };
  const onUploadImage = async (event) => {
    // convert file to base64 encoded
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      const base64data = reader.result;
      console.log(base64data);
    };
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      birthDay: new Date(),
      gender: "",
      mobileNumber: "",
      email: "",
      address: "",
      industry: "",
      experiences: [
        {
          organization: "",
          position: "",
          from: new Date(),
          to: new Date(),
        },
      ],
      academicQualifications: [
        {
          institute: "",
          certificate: "",
          certificateType: "",
          from: new Date(),
          to: new Date(),
        },
      ],
      professionalQualifications: [
        {
          institute: "",
          certificate: "",
          certificateType: "",
          from: new Date(),
          to: new Date(),
        },
      ],
    },
    validationSchema: ProflieSchema,
    onSubmit: (data) => {
      data && show(data);
      formik.resetForm();
    },
  });

  return (
    <div className="flex justify-content-center mypanel">
      <ProfileView
        header={translate("profile_view_panel.profile_header")}
        visible={visible}
        style={{ width: "80%" }}
        onHide={() => setVisible(false)}
        data={formik.values}
      />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-column gap-4 w-full p-4 m-4 border-2 border-blue-500 border-round-lg"
      >
        <div className="grid flex justify-content-between flex-wrap card-container green-container">
          <div className="col-10">
            <div className="text-2xl font-bold">
              {translate("profile_edit_panel.header")}
            </div>
          </div>
          <div className="col-2">
            <Button
              label={translate("profile_edit_panel.view_profle_button_label")}
              onClick={() => setVisible(true)}
            />
          </div>
        </div>
        <div className="text-1xl font-bold">
          {translate("profile_edit_panel.personal_details_header")}
        </div>
        {/* ------------------------------------------------Personal Details--------------------------------------- */}
        <div className="grid">
          <div className="col-4">
            <FileUpload
              accept="image/*"
              maxFileSize={1000000}
              emptyTemplate={
                <p className="m-0">
                  {translate("profile_edit_panel.image_picker_label")}
                </p>
              }
              multiple={false}
              customUpload
              uploadHandler={onUploadImage}
            />
          </div>
          <div className="col-8 pl-4">
            <div className="grid mb-3">
              <div className="col-4">
                <TextInput
                  value={formik.values.firstName}
                  onChangeValue={(e) => {
                    formik.setFieldValue("firstName", e.target.value);
                  }}
                  label={translate("profile_edit_panel.first_name.label")}
                  errormsg={formik.errors["firstName"]}
                  isError={formik.errors["firstName"]}
                />
              </div>
              <div className="col-4 ">
                <TextInput
                  value={formik.values.middleName}
                  onChangeValue={(e) => {
                    formik.setFieldValue("middleName", e.target.value);
                  }}
                  label={translate("profile_edit_panel.middle_name.label")}
                  errormsg={formik.errors["middleName"]}
                  isError={formik.errors["middleName"]}
                />
              </div>
              <div className="col-4">
                <TextInput
                  value={formik.values.lastName}
                  onChangeValue={(e) => {
                    formik.setFieldValue("lastName", e.target.value);
                  }}
                  label={translate("profile_edit_panel.last_name.label")}
                  errormsg={formik.errors["lastName"]}
                  isError={formik.errors["lastName"]}
                />
              </div>
            </div>
            <div className="grid mb-3">
              <div className="col-4">
                <Calendar
                  value={formik.values.birthDay}
                  onChangeValue={(e) => {
                    formik.setFieldValue("birthDay", e.target.value);
                  }}
                  label={translate("profile_edit_panel.birth_day.label")}
                  errormsg={formik.errors["birthDay"]}
                  isError={formik.errors["birthDay"]}
                  showIcon
                />
              </div>
              <div className="col-4">
                <Dropdown
                  value={formik.values.gender}
                  onChangeValue={(e) => {
                    formik.setFieldValue("gender", e.target.value);
                  }}
                  label={translate("profile_edit_panel.gender.label")}
                  errormsg={formik.errors["gender"]}
                  isError={formik.errors["gender"]}
                  options={genders_options}
                />
              </div>
              <div className="col-4">
                <TextInput
                  value={formik.values.mobileNumber}
                  onChangeValue={(e) => {
                    formik.setFieldValue("mobileNumber", e.target.value);
                  }}
                  label={translate("profile_edit_panel.mobile_number.label")}
                  placeholder={translate(
                    "profile_edit_panel.mobile_number.placeholder"
                  )}
                  errormsg={formik.errors["mobileNumber"]}
                  isError={formik.errors["mobileNumber"]}
                />
              </div>
            </div>
            <div className="grid mb-3">
              <div className="col-4">
                <TextInput
                  value={formik.values.email}
                  onChangeValue={(e) => {
                    formik.setFieldValue("email", e.target.value);
                  }}
                  label={translate("profile_edit_panel.email.label")}
                  errormsg={formik.errors["email"]}
                  isError={formik.errors["email"]}
                />
              </div>
              <div className="col-4">
                <TextInput
                  value={formik.values.address}
                  onChangeValue={(e) => {
                    formik.setFieldValue("address", e.target.value);
                  }}
                  label={translate("profile_edit_panel.address.label")}
                  errormsg={formik.errors["address"]}
                  isError={formik.errors["address"]}
                />
              </div>
              <div className="col-4">
                <Dropdown
                  value={formik.values.industry}
                  onChangeValue={(e) => {
                    formik.setFieldValue("industry", e.target.value);
                  }}
                  label={translate("profile_edit_panel.industry.label")}
                  errormsg={formik.errors["industry"]}
                  isError={formik.errors["industry"]}
                  options={industry_options}
                />
              </div>
            </div>
          </div>
        </div>
        {/* ------------------------------------------------Work Experience--------------------------------------- */}
        <div className="flex">
          <div className="flex align-items-center justify-content-center text-1xl font-bold ">
            {translate("profile_edit_panel.work_experience_header")}
          </div>
          <div
            className="flex align-items-center justify-content-center ml-6 p-2 border-2 border-blue-500 border-circle"
            onClick={onAddExperience}
          >
            <i className="pi pi-plus" style={{ fontSize: "1rem" }}></i>
          </div>
        </div>
        {/* --------------------------------------------------------------------------------------- */}
        {formik.values.experiences && formik.values.experiences.length > 0
          ? formik.values.experiences.map((experience, index) => (
              <div className="grid">
                <div className="col-2">
                  <TextInput
                    value={formik.values.experiences[index]?.organization || ""}
                    onChangeValue={(e) => {
                      formik.setFieldValue(
                        `experiences[${index}].organization`,
                        e.target.value
                      );
                    }}
                    label={translate(
                      "profile_edit_panel.work_experience.organization_name.label"
                    )}
                    errormsg={
                      formik.errors["experiences"] &&
                      formik.errors["experiences"][index]?.organization
                    }
                    isError={
                      formik.errors["experiences"] &&
                      formik.errors["experiences"][index]?.organization
                    }
                  />
                </div>
                <div className="col-2">
                  <TextInput
                    value={formik.values.experiences[index]?.position || ""}
                    onChangeValue={(e) => {
                      formik.setFieldValue(
                        `experiences[${index}].position`,
                        e.target.value
                      );
                    }}
                    label={translate(
                      "profile_edit_panel.work_experience.position.label"
                    )}
                    errormsg={
                      formik.errors["experiences"] &&
                      formik.errors["experiences"][index]?.position
                    }
                    isError={
                      formik.errors["experiences"] &&
                      formik.errors["experiences"][index]?.position
                    }
                  />
                </div>
                <div className="col-7">
                  <div className="grid">
                    <div className="col-4">
                      <Calendar
                        value={
                          formik.values.experiences[index]?.from || new Date()
                        }
                        onChangeValue={(e) => {
                          formik.setFieldValue(
                            `experiences[${index}].from`,
                            e.target.value
                          );
                        }}
                        label={translate(
                          "profile_edit_panel.work_experience.from_date.label"
                        )}
                        errormsg={
                          formik.errors["experiences"] &&
                          formik.errors["experiences"][index]?.from
                        }
                        isError={
                          formik.errors["experiences"] &&
                          formik.errors["experiences"][index]?.from
                        }
                        showIcon
                      />
                    </div>

                    <div className="col-4">
                      <Calendar
                        value={
                          formik.values.experiences[index]?.to || new Date()
                        }
                        onChangeValue={(e) => {
                          formik.setFieldValue(
                            `experiences[${index}].to`,
                            e.target.value
                          );
                        }}
                        label={translate(
                          "profile_edit_panel.work_experience.to_date.label"
                        )}
                        errormsg={
                          formik.errors["experiences"] &&
                          formik.errors["experiences"][index]?.to
                        }
                        isError={
                          formik.errors["experiences"] &&
                          formik.errors["experiences"][index]?.to
                        }
                        showIcon
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="col-1 flex align-items-center justify-content-around"
                  onClick={() => onRemoveExperience(index)}
                >
                  <i className="pi pi-times"></i>
                </div>
              </div>
            ))
          : null}
        {/* ------------------------------------------------Academic Qualification--------------------------------------- */}
        <div className="flex">
          <div className="flex align-items-center justify-content-center text-1xl font-bold ">
            {translate("profile_edit_panel.academic_qualification_header")}
          </div>
          <div
            className="flex align-items-center justify-content-center ml-6 p-2 border-2 border-blue-500 border-circle"
            onClick={onAddAcademicQualification}
          >
            <i className="pi pi-plus" style={{ fontSize: "1rem" }}></i>
          </div>
        </div>
        {/* --------------------------------------------------------------------------------------- */}
        {formik.values.academicQualifications &&
        formik.values.academicQualifications.length > 0
          ? formik.values.academicQualifications.map(
              (academicQualification, index) => (
                <div className="grid">
                  <div className="col-2">
                    <TextInput
                      value={
                        formik.values.academicQualifications[index]
                          ?.institute || ""
                      }
                      onChangeValue={(e) => {
                        formik.setFieldValue(
                          `academicQualifications[${index}].institute`,
                          e.target.value
                        );
                      }}
                      label={translate(
                        "profile_edit_panel.academic_qualification.institute_name.label"
                      )}
                      errormsg={
                        formik.errors["academicQualifications"] &&
                        formik.errors["academicQualifications"][index]
                          ?.institute
                      }
                      isError={
                        formik.errors["academicQualifications"] &&
                        formik.errors["academicQualifications"][index]
                          ?.institute
                      }
                    />
                  </div>
                  <div className="col-2">
                    <TextInput
                      value={
                        formik.values.academicQualifications[index]
                          ?.certificate || ""
                      }
                      onChangeValue={(e) => {
                        formik.setFieldValue(
                          `academicQualifications[${index}].certificate`,
                          e.target.value
                        );
                      }}
                      label={translate(
                        "profile_edit_panel.academic_qualification.certificate_name.label"
                      )}
                      errormsg={
                        formik.errors["academicQualifications"] &&
                        formik.errors["academicQualifications"][index]
                          ?.certificate
                      }
                      isError={
                        formik.errors["academicQualifications"] &&
                        formik.errors["academicQualifications"][index]
                          ?.certificate
                      }
                    />
                  </div>
                  <div className="col-7">
                    <div className="grid">
                      <div className="col-4">
                        <Dropdown
                          value={
                            formik.values.academicQualifications[index]
                              ?.certificateType || ""
                          }
                          onChangeValue={(e) => {
                            formik.setFieldValue(
                              `academicQualifications[${index}].certificateType`,
                              e.target.value
                            );
                          }}
                          label={translate(
                            "profile_edit_panel.academic_qualification.certificate_type.label"
                          )}
                          errormsg={
                            formik.errors["academicQualifications"] &&
                            formik.errors["academicQualifications"][index]
                              ?.certificateType
                          }
                          isError={
                            formik.errors["academicQualifications"] &&
                            formik.errors["academicQualifications"][index]
                              ?.certificateType
                          }
                          options={certificate_options}
                        />
                      </div>
                      <div className="col-4">
                        <Calendar
                          value={
                            formik.values.academicQualifications[index]?.from ||
                            new Date()
                          }
                          onChangeValue={(e) => {
                            formik.setFieldValue(
                              `academicQualifications[${index}].from`,
                              e.target.value
                            );
                          }}
                          label={translate(
                            "profile_edit_panel.academic_qualification.from_date.label"
                          )}
                          errormsg={
                            formik.errors["academicQualifications"] &&
                            formik.errors["academicQualifications"][index]?.from
                          }
                          isError={
                            formik.errors["academicQualifications"] &&
                            formik.errors["academicQualifications"][index]?.from
                          }
                          showIcon
                        />
                      </div>

                      <div className="col-4">
                        <Calendar
                          value={
                            formik.values.academicQualifications[index]?.to ||
                            new Date()
                          }
                          onChangeValue={(e) => {
                            formik.setFieldValue(
                              `academicQualifications[${index}].to`,
                              e.target.value
                            );
                          }}
                          label={translate(
                            "profile_edit_panel.academic_qualification.to_date.label"
                          )}
                          errormsg={
                            formik.errors["academicQualifications"] &&
                            formik.errors["academicQualifications"][index]?.to
                          }
                          isError={
                            formik.errors["academicQualifications"] &&
                            formik.errors["academicQualifications"][index]?.to
                          }
                          showIcon
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-1 flex align-items-center justify-content-around"
                    onClick={() => onRemoveAcademicQualification(index)}
                  >
                    <i className="pi pi-times"></i>
                  </div>
                </div>
              )
            )
          : null}
        {/* ------------------------------------------------Professional Qualification--------------------------------------- */}
        <div className="flex">
          <div className="flex align-items-center justify-content-center text-1xl font-bold ">
            {translate("profile_edit_panel.professional_qualification_header")}
          </div>
          <div
            className="flex align-items-center justify-content-center ml-6 p-2 border-2 border-blue-500 border-circle"
            onClick={onAddProfessionalQualification}
          >
            <i className="pi pi-plus" style={{ fontSize: "1rem" }}></i>
          </div>
        </div>
        {/* --------------------------------------------------------------------------------------- */}
        {formik.values.professionalQualifications &&
        formik.values.professionalQualifications.length > 0
          ? formik.values.professionalQualifications.map(
              (academicQualification, index) => (
                <div className="grid">
                  <div className="col-2">
                    <TextInput
                      value={
                        formik.values.professionalQualifications[index]
                          ?.institute || ""
                      }
                      onChangeValue={(e) => {
                        formik.setFieldValue(
                          `professionalQualifications[${index}].institute`,
                          e.target.value
                        );
                      }}
                      label={translate(
                        "profile_edit_panel.professional_qualification.institute_name.label"
                      )}
                      errormsg={
                        formik.errors["professionalQualifications"] &&
                        formik.errors["professionalQualifications"][index]
                          ?.institute
                      }
                      isError={
                        formik.errors["professionalQualifications"] &&
                        formik.errors["professionalQualifications"][index]
                          ?.institute
                      }
                    />
                  </div>
                  <div className="col-2">
                    <TextInput
                      value={
                        formik.values.professionalQualifications[index]
                          ?.certificate || ""
                      }
                      onChangeValue={(e) => {
                        formik.setFieldValue(
                          `professionalQualifications[${index}].certificate`,
                          e.target.value
                        );
                      }}
                      label={translate(
                        "profile_edit_panel.professional_qualification.certificate_name.label"
                      )}
                      errormsg={
                        formik.errors["professionalQualifications"] &&
                        formik.errors["professionalQualifications"][index]
                          ?.certificate
                      }
                      isError={
                        formik.errors["professionalQualifications"] &&
                        formik.errors["professionalQualifications"][index]
                          ?.certificate
                      }
                    />
                  </div>
                  <div className="col-7">
                    <div className="grid">
                      <div className="col-4">
                        <Dropdown
                          value={
                            formik.values.professionalQualifications[index]
                              ?.certificateType || ""
                          }
                          onChangeValue={(e) => {
                            formik.setFieldValue(
                              `professionalQualifications[${index}].certificateType`,
                              e.target.value
                            );
                          }}
                          label={translate(
                            "profile_edit_panel.professional_qualification.certificate_type.label"
                          )}
                          errormsg={
                            formik.errors["professionalQualifications"] &&
                            formik.errors["professionalQualifications"][index]
                              ?.certificateType
                          }
                          isError={
                            formik.errors["professionalQualifications"] &&
                            formik.errors["professionalQualifications"][index]
                              ?.certificateType
                          }
                          options={certificate_options}
                        />
                      </div>
                      <div className="col-4">
                        <Calendar
                          value={
                            formik.values.professionalQualifications[index]
                              ?.from || new Date()
                          }
                          onChangeValue={(e) => {
                            formik.setFieldValue(
                              `professionalQualifications[${index}].from`,
                              e.target.value
                            );
                          }}
                          label={translate(
                            "profile_edit_panel.professional_qualification.from_date.label"
                          )}
                          errormsg={
                            formik.errors["professionalQualifications"] &&
                            formik.errors["professionalQualifications"][index]
                              ?.from
                          }
                          isError={
                            formik.errors["professionalQualifications"] &&
                            formik.errors["professionalQualifications"][index]
                              ?.from
                          }
                          showIcon
                        />
                      </div>

                      <div className="col-4">
                        <Calendar
                          value={
                            formik.values.professionalQualifications[index]
                              ?.to || new Date()
                          }
                          onChangeValue={(e) => {
                            formik.setFieldValue(
                              `proffesionalQualifications[${index}].to`,
                              e.target.value
                            );
                          }}
                          label={translate(
                            "profile_edit_panel.professional_qualification.to_date.label"
                          )}
                          errormsg={
                            formik.errors["proffesionalQualifications"] &&
                            formik.errors["proffesionalQualifications"][index]
                              ?.to
                          }
                          isError={
                            formik.errors["proffesionalQualifications"] &&
                            formik.errors["proffesionalQualifications"][index]
                              ?.to
                          }
                          showIcon
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-1 flex align-items-center justify-content-around"
                    onClick={() => onRemoveProfessionalQualification(index)}
                  >
                    <i className="pi pi-times"></i>
                  </div>
                </div>
              )
            )
          : null}
        <div className="grid mt-4 flex justify-content-end flex-wrap card-container green-container">
          <div className="col-2">
            <Button
              label={translate("profile_edit_panel.submit_button_label")}
              type="submit"
            />
          </div>
          <div className="col-1"></div>
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;
