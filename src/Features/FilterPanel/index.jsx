import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import { searchSeekers } from "../../Store/Slices/seekerSlice";

import { industry_options } from "../../Data/Industry";
import { certificate_options } from "../../Data/Certificate";
import { skills_options } from "../../Data/Skils";

import Profile from "../Profile";
import Dropdown from "../../Components/Dropdown";
import TextInput from "../../Components/TextInput";
import NumberInput from "../../Components/NumberInput";
import MultiSelect from "../../Components/MultiSelect";
import Button from "../../Components/Button";
import Toast from "../../Components/Toast";
import Spinner from "../../Components/Spinner";

function FilterPanel() {
  const { t: translate } = useTranslation();

  const seekers = useSelector((state) => state.seeker.seekers);
  const loginUser = useSelector((state) => state.user.userLogin);

  const dispatch = useDispatch();
  const toast = useRef(null);

  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
    });
  };

  const formik = useFormik({
    initialValues: {
      industry: "",
      educationLevel: "",
      noOfGcsePasses: 0,
      skills: [],
      experience: 0,
      educationQualification: "",
      professionalQualification: "",
    },
    onSubmit: (data) => {
      data && onSubmitForm();
    },
  });

  const onSubmitForm = () => {
    if (loginUser.token) {
      const data = {
        industry: "",
      };
      if (formik.values.industry) data.industry = formik.values.industry;
      if (formik.values.educationLevel)
        data.educationLevel = formik.values.educationLevel;
      if (formik.values.noOfGcsePasses)
        data.noOfGcsePasses = formik.values.noOfGcsePasses;
      if (formik.values.skills.length > 0) data.skills = formik.values.skills;
      if (formik.values.experience) data.experience = formik.values.experience;
      if (formik.values.educationQualification.length > 0)
        data.educationQualification = formik.values.educationQualification;
      if (formik.values.professionalQualification.length > 0)
        data.professionalQualification =
          formik.values.professionalQualification;
      dispatch(
        searchSeekers({
          token: loginUser.token,
          data,
          showToast,
          toastMsg: {
            success: translate("filter_panel.success_message"),
            error: translate("filter_panel.error_message"),
          },
        })
      );
    }
  };

  const onClearForm = () => {
    formik.resetForm();
  };

  const items = seekers?.data ? seekers?.data : [];

  const rows = items.reduce((acc, curr, i) => {
    const index = Math.floor(i / 3);
    if (!acc[index]) {
      acc[index] = [];
    }
    acc[index].push(curr);
    return acc;
  }, []);

  return (
    <div className=" m-4">
      <div className="grid p-4">
        <div className="col text-2xl font-bold">
          {translate("filter_panel.filter_header")}
        </div>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-column gap-4 w-full p-4 mb-4 shadow-3 border-round-lg"
      >
        <div className="grid flex justify-content-between flex-wrap card-container green-container">
          <div className="col-8">
            <div className="grid">
              <div className="col-4">
                <Dropdown
                  value={formik.values.industry}
                  onChangeValue={(e) => {
                    formik.setFieldValue("industry", e.target.value);
                  }}
                  label={translate("filter_panel.industry")}
                  isError={false}
                  options={industry_options}
                />
              </div>
              <div className="col-4">
                <Dropdown
                  value={formik.values.educationLevel}
                  onChangeValue={(e) => {
                    formik.setFieldValue("educationLevel", e.target.value);
                  }}
                  label={translate("filter_panel.education_level")}
                  isError={false}
                  options={certificate_options}
                />
              </div>

              <div className="col-4">
                <NumberInput
                  value={formik.values.noOfGcsePasses}
                  onChangeValue={(e) => {
                    formik.setFieldValue("noOfGcsePasses", e.value);
                  }}
                  label={translate("filter_panel.no_of_gcse_passes")}
                  isError={false}
                />
              </div>
              <div className="col-4">
                <MultiSelect
                  value={formik.values.skills}
                  onChangeValue={(e) => {
                    formik.setFieldValue("skills", e.value);
                  }}
                  label={translate("filter_panel.skills")}
                  isError={false}
                  options={skills_options}
                />
              </div>
              <div className="col-4">
                <NumberInput
                  value={formik.values.experience}
                  onChangeValue={(e) => {
                    formik.setFieldValue("experience", e.value);
                  }}
                  label={translate("filter_panel.experience")}
                  isError={false}
                />
              </div>
              <div className="col-4">
                <TextInput
                  value={formik.values.educationQualification}
                  onChangeValue={(e) => {
                    formik.setFieldValue(
                      "educationQualification",
                      e.target.value
                    );
                  }}
                  label={translate("filter_panel.education_qualification")}
                  isError={false}
                />
              </div>
              <div className="col-4">
                <TextInput
                  value={formik.values.professionalQualification}
                  onChangeValue={(e) => {
                    formik.setFieldValue(
                      "professionalQualification",
                      e.target.value
                    );
                  }}
                  label={translate("filter_panel.professional_qualification")}
                  isError={false}
                />
              </div>
            </div>
          </div>
          <div className="col-2 pl-5">
            <Button
              label={translate("filter_panel.search_button")}
              type="submit"
              severity="success"
            />
          </div>
          <div className="col-2 pr-5">
            <Button
              label={translate("filter_panel.clear_button")}
              type="button"
              onClick={onClearForm}
              severity="danger"
            />
          </div>
        </div>
        <Toast ref={toast} />
      </form>
      {/* ----------------------------------------Profile-------------------------------------------- */}
      <div className="grid pl-4 pr-4">
        <div className="col text-lg font-bold">
          {translate("filter_panel.candidate_header")}
        </div>
      </div>

      <div className="grid justify-content-center align-items-center flex pl-4 pr-4">
        {seekers.status == "loading" && <Spinner />}
        {seekers?.data.map((item, index) => (
          <div key={index} className="col-9 ">
            <Profile data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterPanel;
