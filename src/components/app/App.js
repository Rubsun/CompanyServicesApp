import React from 'react';
import {Attachment} from "@consta/uikit/Attachment";
import {Avatar} from '@consta/uikit/Avatar';
import {Layout} from "@consta/uikit/Layout";
import {Text} from "@consta/uikit/Text"
import {Loader} from '@consta/uikit/Loader';
import {Card} from "@consta/uikit/Card";
import {presetGpnDefault, Theme} from '@consta/uikit/Theme';
import {IconForward} from "@consta/icons/IconForward";
import {Button} from "@consta/uikit/Button";
import {User} from "@consta/uikit/User";


const App = function () {
    return (
        <Theme preset={presetGpnDefault}> <Avatar url="public/logo512.png" name="Вадим Матвеев"/>
            <Layout>
                <Layout flex={1}>
                    <Text view="primary" size="m" lineHeight="m">
                        Это первый блок
                        <Card verticalSpace="2xl" horizontalSpace="2xl" status="alert">
                            <Text>Опасная карточка</Text>
                        </Card>
                    </Text>
                    <Attachment
                        withPictogram
                        fileName="Файл"
                        fileExtension="jpg"
                        fileDescription="14 Мб 01.04.2020, 07:01"
                    />
                </Layout>
                <Layout flex={2}>
                    <Text view="primary" size="m" lineHeight="m">
                        А это второй блок, он в два раза шире первого
                    </Text>

                    <Loader size="xs"/>
                </Layout>
            </Layout>

            <Card verticalSpace="2xl" horizontalSpace="2xl" status="warning">
                <Text>Тревожная карточка</Text>
            </Card>
            <Card verticalSpace="2xl" horizontalSpace="2xl" status="success">
                <Text>Успешная карточка</Text>
            </Card>
            <Button label="Продолжить" iconRight={IconForward}/>
            <User name="Роберт Пласт" info="Cейсмик"/>

        </Theme>


    )
}


export default App;
