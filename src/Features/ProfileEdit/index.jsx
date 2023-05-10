import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import {
  getSeeker,
  updateSeeker,
  onUploadImageStart,
  onUploadImageSuccess,
  onUploadImageFail,
} from "../../Store/Slices/seekerSlice";
import { uploadProfileImage } from "../../Services/seekerService";

import FileUpload from "../../Components/FileUpload";
import TextInput from "../../Components/TextInput";
import NumberInput from "../../Components/NumberInput";
import Calendar from "../../Components/Calendar";
import Image from "../../Components/Image";

import { genders_options } from "../../Data/Gender";
import { industry_options } from "../../Data/Industry";
import { certificate_options } from "../../Data/Certificate";
import { skills_options } from "../../Data/Skils";
import Dropdown from "../../Components/Dropdown";
import Button from "../../Components/Button";
import Toast from "../../Components/Toast";
import MultiSelect from "../../Components/MultiSelect";
import Spinner from "../../Components/Spinner";
import ProfileView from "../ProfileView";

function ProfileEdit() {
  const { t: translate } = useTranslation();

  const ProflieSchema = Yup.object().shape({
    profileImage: Yup.string().required(
      translate("profile_edit_panel.profile_image.error_message.required")
    ),
    firstName: Yup.string()
      .min(2, translate("profile_edit_panel.first_name.error_message.short"))
      .max(50, translate("profile_edit_panel.first_name.error_message.long"))
      .required(
        translate("profile_edit_panel.first_name.error_message.required")
      ),
    // middleName: Yup.string()
    //   .min(2, translate("profile_edit_panel.middle_name.error_message.short"))
    //   .max(50, translate("profile_edit_panel.middle_name.error_message.long"))
    //   .required(
    //     translate("profile_edit_panel.middle_name.error_message.required")
    //   ),
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
    yearsOfExperience: Yup.number(
      translate("profile_edit_panel.years_of_experience.error_message.invalid")
    ).required(
      translate("profile_edit_panel.years_of_experience.error_message.required")
    ),
    educationLevel: Yup.string()
      .oneOf(
        certificate_options,
        translate("profile_edit_panel.education_level.error_message.invalid")
      )
      .required(
        translate("profile_edit_panel.education_level.error_message.required")
      ),
    gcsePasses: Yup.number(
      translate("profile_edit_panel.gcse_passes.error_message.invalid")
    ).required(
      translate("profile_edit_panel.gcse_passes.error_message.required")
    ),
    skills: Yup.array()
      .of(Yup.string())
      .min(1, translate("profile_edit_panel.skills.error_message.required"))
      .test(
        "skills-options",
        translate("profile_edit_panel.skills.error_message.invalid"),
        function (value) {
          for (let i = 0; i < value.length; i++) {
            if (skills_options.includes(value[i])) {
              return true;
            }
          }
          return false;
        }
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
  const user = useSelector((state) => state.seeker.seeker);
  const userUpdate = useSelector((state) => state.seeker.seekerUpdate);
  const loginUser = useSelector((state) => state.user.userLogin);
  const profileImage = useSelector((state) => state.seeker.profileImage);
  const toast = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loginUser.token && loginUser.userId)
      dispatch(
        getSeeker({
          token: loginUser.token,
          userId: loginUser.userId,
          showToast,
          toastMsg: {
            success: translate("profile_edit_panel.get_success_message"),
            error: translate("profile_edit_panel.get_error_message"),
          },
        })
      );
  }, [loginUser]);

  useEffect(() => {
    if (profileImage.data)
      formik.setFieldValue("profileImage", profileImage.data);
  }, [profileImage.data]);

  useEffect(() => {
    formik.setFieldValue(
      "firstName",
      user?.user?.firstName ? user?.user?.firstName : ""
    );
    formik.setFieldValue(
      "lastName",
      user?.user?.lastName ? user?.user?.lastName : ""
    );
    formik.setFieldValue("email", user?.user?.email ? user?.user?.email : "");
    formik.setFieldValue(
      "gender",
      user?.user?.gender ? user?.user?.gender : ""
    );
    formik.setFieldValue(
      "birthDay",
      user?.user?.birthDay ? new Date(user?.user?.birthDay) : new Date()
    );
    formik.setFieldValue(
      "mobileNumber",
      user?.user?.mobileNumber ? user?.user?.mobileNumber : ""
    );
    formik.setFieldValue(
      "address",
      user?.user?.address ? user?.user?.address : ""
    );
    formik.setFieldValue("industry", user?.industry ? user?.industry : "");
    formik.setFieldValue(
      "educationLevel",
      user?.educationLevel ? user?.educationLevel : ""
    );
    formik.setFieldValue("gcsePasses", user?.gcsePasses ? user?.gcsePasses : 0);
    formik.setFieldValue(
      "yearsOfExperience",
      user?.yearsOfExperience ? user?.yearsOfExperience : 0
    );
    formik.setFieldValue("skills", user?.skills ? user?.skills : []);
    formik.setFieldValue(
      "profileImage",
      user?.profileImage ? user?.profileImage : null
    );

    const experiences = [];
    user?.experiences.map((experience) => {
      experiences.push({
        id: experience?.id ? experience?.id : 0,
        organization: experience?.organization ? experience?.organization : "",
        position: experience?.position ? experience?.position : "",
        from: experience?.start ? new Date(experience?.start) : new Date(),
        to: experience?.end ? new Date(experience?.end) : new Date(),
      });
    });
    formik.setFieldValue("experiences", experiences);

    const academicQualifications = [];
    user?.academicQualifications.map((qualification) => {
      academicQualifications.push({
        id: qualification?.id ? qualification?.id : 0,
        institute: qualification?.institute ? qualification?.institute : "",
        certificate: qualification?.certificate
          ? qualification?.certificate
          : "",
        certificateType: qualification?.certificateType
          ? qualification?.certificateType
          : "",
        from: qualification?.start
          ? new Date(qualification?.start)
          : new Date(),
        to: qualification?.end ? new Date(qualification?.end) : new Date(),
      });
    });
    formik.setFieldValue("academicQualifications", academicQualifications);

    const professionalQualifications = [];
    user?.professionalQualifications.map((qualification) => {
      professionalQualifications.push({
        id: qualification?.id ? qualification?.id : 0,
        institute: qualification?.institute ? qualification?.institute : "",
        certificate: qualification?.certificate
          ? qualification?.certificate
          : "",
        certificateType: qualification?.certificateType
          ? qualification?.certificateType
          : "",
        from: qualification?.start
          ? new Date(qualification?.start)
          : new Date(),
        to: qualification?.end ? new Date(qualification?.end) : new Date(),
      });
    });
    formik.setFieldValue(
      "professionalQualifications",
      professionalQualifications
    );
  }, [user]);

  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
    });
  };

  const onSubmitForm = () => {
    console.log(formik.values);

    if (loginUser?.token && loginUser?.userId && loginUser?.userName) {
      const academicQualifications = [];

      formik.values.academicQualifications.map((qualification) => {
        academicQualifications.push({
          id: qualification?.id,
          institute: qualification?.institute,
          certificate: qualification?.certificate,
          certificateType: qualification?.certificateType,
          start: moment(qualification?.from).format("YYYY-MM-DD"),
          end: moment(qualification?.to).format("YYYY-MM-DD"),
        });
      });

      const professionalQualifications = [];

      formik.values.professionalQualifications.map((qualification) => {
        professionalQualifications.push({
          id: qualification?.id,
          institute: qualification?.institute,
          certificate: qualification?.certificate,
          certificateType: qualification?.certificateType,
          start: moment(qualification?.from).format("YYYY-MM-DD"),
          end: moment(qualification?.to).format("YYYY-MM-DD"),
        });
      });

      const experiences = [];

      formik.values.experiences.map((experience) => {
        experiences.push({
          id: experience?.id,
          position: experience?.position,
          organization: experience?.organization,
          location: "",
          start: moment(experience?.from).format("YYYY-MM-DD"),
          end: moment(experience?.to).format("YYYY-MM-DD"),
          skills: [],
        });
      });

      const data = {
        id: loginUser?.userId,
        headline: "",
        about: "",
        industry: formik.values?.industry,
        educationLevel: formik.values?.educationLevel,
        gcsePasses: formik.values?.gcsePasses,
        yearsOfExperience: formik.values?.yearsOfExperience,
        profileImageUrl: formik.values?.profileImage,
        skills: formik.values?.skills,
        user: {
          id: loginUser?.userId,
          firstName: formik.values?.firstName,
          lastName: formik.values?.lastName,
          username: loginUser?.userName,
          birthDay: moment(formik.values?.birthDay).format("YYYY-MM-DD"),
          mobileNumber: formik.values?.mobileNumber,
          gender: formik.values?.gender,
          address: formik.values?.address,
          email: formik.values?.email,
        },
        academicQualifications,
        professionalQualifications,
        experiences,
      };
      dispatch(
        updateSeeker({
          token: loginUser.token,
          userId: loginUser.userId,
          data,
          showToast,
          toastMsg: {
            success: translate("profile_edit_panel.update_success_message"),
            error: translate("profile_edit_panel.update_error_message"),
          },
        })
      );
    }
  };

  const onAddExperience = () => {
    const newExperiences = [...formik.values.experiences];
    newExperiences.push({
      id: 0,
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
      id: 0,
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
      id: 0,
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
    try {
      dispatch(onUploadImageStart());
      const file = event.target.files[0];
      const profileUrl = await uploadProfileImage(file);
      dispatch(onUploadImageSuccess(profileUrl));
    } catch (error) {
      console.log(error);
      dispatch(onUploadImageFail());
    }
  };

  const formik = useFormik({
    initialValues: {
      profileImage: "",
      firstName: "",
      middleName: "",
      lastName: "",
      birthDay: new Date(),
      gender: "",
      mobileNumber: "",
      email: "",
      address: "",
      industry: "",
      about: "",
      yearsOfExperience: 0,
      educationLevel: "",
      gcsePasses: 0,
      skills: [],
      experiences: [
        {
          id: 0,
          organization: "",
          position: "",
          from: new Date(),
          to: new Date(),
        },
      ],
      academicQualifications: [
        {
          id: 0,
          institute: "",
          certificate: "",
          certificateType: "",
          from: new Date(),
          to: new Date(),
        },
      ],
      professionalQualifications: [
        {
          id: 0,
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
      data && onSubmitForm();
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
        className="flex flex-column gap-4 w-full p-4 m-4 shadow-3 border-round-lg"
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
              type="button"
            />
          </div>
        </div>
        <div className="text-1xl font-bold">
          {translate("profile_edit_panel.personal_details_header")}
        </div>
        {/* ------------------------------------------------Personal Details--------------------------------------- */}
        <div className="grid">
          <div className="col-4 flex flex-column justify-content-start align-items-center justify-content-start">
            <FileUpload
              onChangeValue={onUploadImage}
              label={translate("profile_edit_panel.image_picker_label")}
              errormsg={formik.errors["profileImage"]}
              isError={formik.errors["profileImage"]}
            />
            {profileImage.status == "loading" && (
              <div className="flex flex-column w-full mt-3">
                <Spinner />
              </div>
            )}
            <Image
              src={formik.values.profileImage}
              height="250"
              className="mt-3"
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
                  value={formik.values.lastName}
                  onChangeValue={(e) => {
                    formik.setFieldValue("lastName", e.target.value);
                  }}
                  label={translate("profile_edit_panel.last_name.label")}
                  errormsg={formik.errors["lastName"]}
                  isError={formik.errors["lastName"]}
                />
              </div>
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
            </div>
            <div className="grid mb-3">
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
              <div className="col-4">
                <NumberInput
                  value={formik.values.yearsOfExperience}
                  onChangeValue={(e) => {
                    formik.setFieldValue("yearsOfExperience", e.value);
                  }}
                  label={translate(
                    "profile_edit_panel.years_of_experience.label"
                  )}
                  errormsg={formik.errors["yearsOfExperience"]}
                  isError={formik.errors["yearsOfExperience"]}
                />
              </div>
            </div>
            <div className="grid mb-3">
              <div className="col-4">
                <Dropdown
                  value={formik.values.educationLevel}
                  onChangeValue={(e) => {
                    formik.setFieldValue("educationLevel", e.target.value);
                  }}
                  label={translate("profile_edit_panel.education_level.label")}
                  errormsg={formik.errors["educationLevel"]}
                  isError={formik.errors["educationLevel"]}
                  options={certificate_options}
                />
              </div>
              <div className="col-4">
                <NumberInput
                  value={formik.values.gcsePasses}
                  onChangeValue={(e) => {
                    formik.setFieldValue("gcsePasses", e.value);
                  }}
                  label={translate("profile_edit_panel.gcse_passes.label")}
                  errormsg={formik.errors["gcsePasses"]}
                  isError={formik.errors["gcsePasses"]}
                />
              </div>
              <div className="col-4">
                <MultiSelect
                  value={formik.values.skills}
                  onChangeValue={(e) => {
                    formik.setFieldValue("skills", e.value);
                  }}
                  label={translate("profile_edit_panel.skills.label")}
                  errormsg={formik.errors["skills"]}
                  isError={formik.errors["skills"]}
                  options={skills_options}
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
              <div key={index} className="grid">
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
                <div key={index} className="grid">
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
                <div key={index} className="grid">
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
          <div className="col-1">
            {userUpdate.status == "loading" && <Spinner />}
          </div>
        </div>
      </form>
      <Toast ref={toast} />
    </div>
  );
}

export default ProfileEdit;
