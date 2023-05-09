import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Dialog from "../../Components/Dialog";
import Image from "../../Components/Image";
import Title from "../../Components/Title";

function ProfileView({ data, ...otherProps }) {
  const { t: translate } = useTranslation();
  return (
    <Dialog {...otherProps}>
      {/* ------------------------------------------------Personal Details--------------------------------------- */}
      <div className="grid">
        <div className="col-4">
          <Image src={data?.profileImage} alt="Image" width="250" />
        </div>
        <div className="col-8">
          <div className="grid mb-3">
            <div className="col">
              <Title
                Title={translate("profile_view_panel.first_name")}
                subTitle={data?.firstName}
              />
            </div>
            <div className="col">
              <Title
                Title={translate("profile_view_panel.last_name")}
                subTitle={data?.lastName}
              />
            </div>
            <div className="col">
              <Title
                Title={translate("profile_view_panel.birth_day")}
                subTitle={`${data?.birthDay.getFullYear()}/${
                  data?.birthDay.getMonth() + 1
                }/${data?.birthDay.getDate()}`}
              />
            </div>
          </div>
          <div className="grid mb-3">
            <div className="col">
              <Title
                Title={translate("profile_view_panel.gender")}
                subTitle={data?.gender}
              />
            </div>
            <div className="col">
              <Title
                Title={translate("profile_view_panel.email")}
                subTitle={data?.email}
              />
            </div>
            <div className="col">
              <Title
                Title={translate("profile_view_panel.mobile_number")}
                subTitle={data?.mobileNumber}
              />
            </div>
          </div>
          <div className="grid">
            <div className="col">
              <Title
                Title={translate("profile_view_panel.address")}
                subTitle={data?.address}
              />
            </div>
            <div className="col">
              <Title
                Title={translate("profile_view_panel.industry")}
                subTitle={data?.industry}
              />
            </div>
            <div className="col">
              <Title
                Title={translate("profile_view_panel.years_of_experience")}
                subTitle={data?.yearsOfExperience}
              />
            </div>
          </div>
          <div className="grid">
            <div className="col">
              <Title
                Title={translate("profile_view_panel.education_level")}
                subTitle={data?.educationLevel}
              />
            </div>
            <div className="col">
              <Title
                Title={translate("profile_view_panel.gcse_passes")}
                subTitle={data?.gcsePasses}
              />
            </div>
            <div className="col"></div>
          </div>

          <div className="grid">
            <div className="col-12">
              <div>
                <Title Title={translate("profile_view_panel.skills")} />
              </div>
              <div className="flex flex-wrap">
                {data?.skills && data?.skills.length > 0
                  ? data?.skills.map((skill, index) => {
                      return (
                        <div className="m-2 p-2 bg-blue-100 border-round-xl">
                          {skill}
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------Work Experience--------------------------------------- */}
      <div className="text-xl font-bold">
        {translate("profile_view_panel.work_experience.header")}
      </div>
      {data?.experiences && data?.experiences.length > 0
        ? data?.experiences.map((experience, index) => (
            <div className="grid mt-2 border-round-md shadow-1">
              <div className="col">
                <Title
                  Title={translate(
                    "profile_view_panel.work_experience.organization_name"
                  )}
                  subTitle={experience?.organization}
                />
              </div>
              <div className="col">
                <Title
                  Title={translate(
                    "profile_view_panel.work_experience.position"
                  )}
                  subTitle={experience?.position}
                />
              </div>
              <div className="col">
                <Title
                  Title={translate(
                    "profile_view_panel.work_experience.from_date"
                  )}
                  subTitle={`${experience?.from.getFullYear()}/${
                    experience?.from.getMonth() + 1
                  }/${experience?.from.getDate()}`}
                />
              </div>
              <div className="col">
                <Title
                  Title={translate(
                    "profile_view_panel.work_experience.to_date"
                  )}
                  subTitle={`${experience?.to.getFullYear()}/${
                    experience?.to.getMonth() + 1
                  }/${experience?.to.getDate()}`}
                />
              </div>
              <div className="col"></div>
            </div>
          ))
        : null}
      {/* ------------------------------------------------Academic Qualification--------------------------------------- */}
      <div className="text-xl font-bold mt-6">
        {translate("profile_view_panel.academic_qualification.header")}
      </div>
      {data?.academicQualifications && data?.academicQualifications.length > 0
        ? data?.academicQualifications.map((academicQualification, index) => (
            <div className="grid mt-2 border-round-md shadow-1">
              <div className="col">
                <Title
                  Title={translate(
                    "profile_view_panel.academic_qualification.institute_name"
                  )}
                  subTitle={academicQualification?.institute}
                />
              </div>
              <div className="col">
                <Title
                  Title={translate(
                    "profile_view_panel.academic_qualification.certificate_name"
                  )}
                  subTitle={academicQualification?.certificate}
                />
              </div>
              <div className="col">
                <Title
                  Title={translate(
                    "profile_view_panel.academic_qualification.certificate_type"
                  )}
                  subTitle={academicQualification?.certificateType}
                />
              </div>
              <div className="col">
                <Title
                  Title={translate(
                    "profile_view_panel.academic_qualification.from_date"
                  )}
                  subTitle={`${academicQualification?.from.getFullYear()}/${
                    academicQualification?.from.getMonth() + 1
                  }/${academicQualification?.from.getDate()}`}
                />
              </div>
              <div className="col">
                <Title
                  Title={translate(
                    "profile_view_panel.academic_qualification.to_date"
                  )}
                  subTitle={`${academicQualification?.to.getFullYear()}/${
                    academicQualification?.to.getMonth() + 1
                  }/${academicQualification?.to.getDate()}`}
                />
              </div>
            </div>
          ))
        : null}
      {/* ------------------------------------------------Professional Qualification--------------------------------------- */}
      <div className="text-xl font-bold mt-6">
        {translate("profile_view_panel.professional_qualification.header")}
      </div>
      {data?.professionalQualifications &&
      data?.professionalQualifications.length > 0
        ? data?.professionalQualifications.map(
            (professionalQualification, index) => (
              <div className="grid mt-2 border-round-md shadow-1">
                <div className="col">
                  <Title
                    Title={translate(
                      "profile_view_panel.professional_qualification.institute_name"
                    )}
                    subTitle={professionalQualification?.institute}
                  />
                </div>
                <div className="col">
                  <Title
                    Title={translate(
                      "profile_view_panel.professional_qualification.certificate_name"
                    )}
                    subTitle={professionalQualification?.certificate}
                  />
                </div>
                <div className="col">
                  <Title
                    Title={translate(
                      "profile_view_panel.professional_qualification.certificate_type"
                    )}
                    subTitle={professionalQualification?.certificateType}
                  />
                </div>
                <div className="col">
                  <Title
                    Title={translate(
                      "profile_view_panel.professional_qualification.from_date"
                    )}
                    subTitle={`${professionalQualification?.from.getFullYear()}/${
                      professionalQualification?.from.getMonth() + 1
                    }/${professionalQualification?.from.getDate()}`}
                  />
                </div>
                <div className="col">
                  <Title
                    Title={translate(
                      "profile_view_panel.professional_qualification.to_date"
                    )}
                    subTitle={`${professionalQualification?.to.getFullYear()}/${
                      professionalQualification?.to.getMonth() + 1
                    }/${professionalQualification?.to.getDate()}`}
                  />
                </div>
              </div>
            )
          )
        : null}
    </Dialog>
  );
}

export default ProfileView;
